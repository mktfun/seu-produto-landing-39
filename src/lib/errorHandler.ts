// Sistema de tratamento de erros global
export function setupGlobalErrorHandling() {
  // Capturar erros não tratados
  window.addEventListener('error', (event) => {
    console.warn('Global error captured:', event.error);
    
    // Enhanced error filtering for FullStory and other known issues
    const ignoredErrors = [
      'IFrame evaluation timeout',
      'LaunchDarkly',
      'FullStory',
      '_fs_namespace',
      'FullStory namespace conflict',
      'Script error',
      'Non-Error promise rejection captured',
      'chunk loading',
      'ERR_BLOCKED_BY_CLIENT'
    ];

    const shouldIgnore = ignoredErrors.some(ignored => {
      const errorMessage = event.error?.message?.toLowerCase() || '';
      const fileName = event.filename?.toLowerCase() || '';
      const ignoredLower = ignored.toLowerCase();

      return errorMessage.includes(ignoredLower) ||
             fileName.includes(ignoredLower) ||
             event.error?.stack?.toLowerCase().includes(ignoredLower);
    });
    
    if (shouldIgnore) {
      event.preventDefault();
      return false;
    }
  });

  // Enhanced promise rejection handling
  window.addEventListener('unhandledrejection', (event) => {
    const reasonMessage = event.reason?.message?.toLowerCase() || '';
    const reasonString = String(event.reason).toLowerCase();

    // Comprehensive filtering for known issues
    const shouldIgnore = [
      'timeout',
      'iframe evaluation',
      'fullstory',
      '_fs_namespace',
      'fullstory namespace conflict',
      'script error',
      'chunk loading'
    ].some(pattern => reasonMessage.includes(pattern) || reasonString.includes(pattern));

    if (shouldIgnore) {
      event.preventDefault();
      return false;
    }

    console.warn('Unhandled promise rejection:', event.reason);
  });

  // Enhanced console filtering for FullStory and other known issues
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.error = (...args) => {
    const message = args.join(' ');

    // More comprehensive filtering
    const shouldSilence = [
      'FullStory namespace conflict',
      'FullStory',
      '_fs_namespace',
      'LaunchDarkly',
      'chunk loading',
      'ERR_BLOCKED_BY_CLIENT',
      'IFrame evaluation timeout',
      'Script error'
    ].some(pattern => message.toLowerCase().includes(pattern.toLowerCase()));

    if (!shouldSilence) {
      originalConsoleError.apply(console, args);
    }
  };

  console.warn = (...args) => {
    const message = args.join(' ');

    const shouldSilence = [
      'FullStory namespace conflict',
      'FullStory',
      '_fs_namespace'
    ].some(pattern => message.toLowerCase().includes(pattern.toLowerCase()));

    if (!shouldSilence) {
      originalConsoleWarn.apply(console, args);
    }
  };
}

// Configurar fetch com timeouts padrão (sem interferir no Supabase)
export function setupFetchWithTimeout() {
  if (typeof window !== 'undefined' && window.fetch) {
    const originalFetch = window.fetch;

    window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
      // Don't wrap Supabase requests to avoid body stream conflicts
      const url = typeof input === 'string' ? input : input.url;
      if (url.includes('supabase.co')) {
        return originalFetch(input, init);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const fetchOptions: RequestInit = {
        ...init,
        signal: controller.signal
      };

      return originalFetch(input, fetchOptions)
        .finally(() => clearTimeout(timeoutId))
        .catch(error => {
          if (error.name === 'AbortError') {
            throw new Error('Request timeout');
          }
          throw error;
        });
    };
  }
}

// Função para reportar erros de forma silenciosa
export function silentErrorReport(error: any, context: string) {
  console.warn(`[${context}] Silent error:`, error);
  
  // Aqui você pode adicionar integração com serviços de monitoramento
  // como Sentry, LogRocket, etc.
}
