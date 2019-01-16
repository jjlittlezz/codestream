﻿using CodeStream.VisualStudio.Core.Logging;
using CodeStream.VisualStudio.Events;
using CodeStream.VisualStudio.Services;
using CodeStream.VisualStudio.UI;
using CodeStream.VisualStudio.UI.Settings;
using CodeStream.VisualStudio.Vssdk;
using Microsoft.VisualStudio;
using Microsoft.VisualStudio.Shell;
using Microsoft.VisualStudio.Shell.Interop;
using Serilog;
using System;
using System.Runtime.InteropServices;
using System.Threading;

namespace CodeStream.VisualStudio
{
    [PackageRegistration(UseManagedResourcesOnly = true, AllowsBackgroundLoading = true)]
    [InstalledProductRegistration("#110", "#112", "0.1.0", IconResourceID = 400)] // Info on this package for Help/About
    [ProvideOptionPage(typeof(OptionsDialogPage), "CodeStream", "Settings", 0, 0, true)]
    [Guid(Guids.CodeStreamPackageId)]
    [ProvideAutoLoad(VSConstants.UICONTEXT.NoSolution_string, PackageAutoLoadFlags.BackgroundLoad)]
    [ProvideAutoLoad(VSConstants.UICONTEXT.SolutionExists_string, PackageAutoLoadFlags.BackgroundLoad)]
    [ProvideAutoLoad(VSConstants.UICONTEXT.SolutionHasMultipleProjects_string, PackageAutoLoadFlags.BackgroundLoad)]
    [ProvideAutoLoad(VSConstants.UICONTEXT.SolutionHasSingleProject_string, PackageAutoLoadFlags.BackgroundLoad)]
    public sealed class CodeStreamPackage : AsyncPackage
    {
        private static readonly ILogger Log = LogManager.ForContext<CodeStreamPackage>();

        private Lazy<ICodeStreamService> _codeStreamService;
        private IDisposable _languageServerReadyEvent;
        private VsShellEventManager _vsShellEventManager;
        private CodeStreamEventManager _codeStreamEventManager;

        protected override async System.Threading.Tasks.Task InitializeAsync(CancellationToken cancellationToken, IProgress<ServiceProgressData> progress)
        {
            await base.InitializeAsync(cancellationToken, progress);

            // When initialized asynchronously, the current thread may be a background thread at this point.
            // Do any initialization that requires the UI thread after switching to the UI thread.
            await JoinableTaskFactory.SwitchToMainThreadAsync(cancellationToken);

            // kick it off!
            await GetServiceAsync(typeof(SToolWindowProvider));

            Log.Verbose(@"
   ___          _      __ _                            
  / __\___   __| | ___/ _\ |_ _ __ ___  __ _ _ __ ___  
 / /  / _ \ / _` |/ _ \ \| __| '__/ _ \/ _` | '_ ` _ \ 
/ /__| (_) | (_| |  __/\ \ |_| | |  __/ (_| | | | | | |
\____/\___/ \__,_|\___\__/\__|_|  \___|\__,_|_| |_| |_|
                                                       ");
            Log.Information("Initializing CodeStream Extension v{PackageVersion} in {$VisualStudioName} ({$VisualStudioVersion})",
    Application.ExtensionVersionShort, Application.VisualStudioName, Application.VisualStudioVersion);

            await InitializeLoggingAsync();

            var eventAggregator = await GetServiceAsync(typeof(SEventAggregator)) as IEventAggregator;
            _vsShellEventManager = new VsShellEventManager(await GetServiceAsync(typeof(SVsShellMonitorSelection)) as IVsMonitorSelection);

            // ReSharper disable once PossibleNullReferenceException
            _languageServerReadyEvent = eventAggregator.GetEvent<LanguageServerReadyEvent>().Subscribe(_ =>
            {
                ThreadHelper.ThrowIfNotOnUIThread();
                _codeStreamService = new Lazy<ICodeStreamService>(() => GetService(typeof(SCodeStreamService)) as ICodeStreamService);
                _codeStreamEventManager = new CodeStreamEventManager(_vsShellEventManager, _codeStreamService);
            });

            // Avoid delays when there is ongoing UI activity.
            // See: https://github.com/github/VisualStudio/issues/1537
            await JoinableTaskFactory.RunAsync(VsTaskRunContext.UIThreadNormalPriority, InitializeUiComponentsAsync);
        }
        
        // Set pfCanClose=false to prevent a tool window from closing
        //protected override int QueryClose(out bool pfCanClose)
        //{
        //    pfCanClose = true;
        //    // ReSharper disable once ConditionIsAlwaysTrueOrFalse
        //    if (pfCanClose)
        //    {
        //    }

        //    return VSConstants.S_OK;
        //}

        protected override void Dispose(bool isDisposing)
        {
            if (isDisposing)
            {
                _vsShellEventManager?.Dispose();
                _languageServerReadyEvent?.Dispose();
                _codeStreamEventManager?.Dispose();
            }

            base.Dispose(isDisposing);
        }

        async System.Threading.Tasks.Task InitializeLoggingAsync()
        {
            var packageSettings = await GetServiceAsync(typeof(SSettingsService)) as ISettingsService;

            if (packageSettings != null)
            {
                packageSettings.DialogPage.PropertyChanged += (sender, args) =>
                {
                    if (args.PropertyName == nameof(packageSettings.TraceLevel))
                    {
                        LogManager.SetTraceLevel(packageSettings.TraceLevel);
                    }
                    else if (args.PropertyName == nameof(packageSettings.WebAppUrl) ||
                             args.PropertyName == nameof(packageSettings.ServerUrl) ||
                             args.PropertyName == nameof(packageSettings.Team))
                    {
                        Log.Verbose($"Url(s) or Team changed");
                        if (_codeStreamService?.Value?.BrowserService != null)
                        {
                            _codeStreamService?.Value?.BrowserService?.ReloadWebView();
                        }
                    }
                };
            }
        }

        async System.Threading.Tasks.Task InitializeUiComponentsAsync()
        {
        //    // TODO move this into a non-static??
           InfoBarProvider.Initialize(this);       
        }
    }
}
