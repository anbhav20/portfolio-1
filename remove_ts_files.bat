@echo off
echo Removing TypeScript files...

REM Remove core TypeScript files
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\App.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\main.tsx"

REM Remove TypeScript versions of pages
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\pages\Home.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\pages\not-found.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\pages\Portfolio.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\pages\TrackingRedirect.tsx"

REM Remove TypeScript versions of hooks
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\hooks\use-mobile.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\hooks\use-toast.ts"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\hooks\useTypingEffect.tsx"

REM Remove TypeScript versions of lib files
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\lib\formValidation.ts"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\lib\queryClient.ts"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\lib\utils.ts"

REM Remove TypeScript versions of components
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\EntranceAnimation.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\Header.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\HeroSection.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\ScrollToTop.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\ThemeProvider.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\ThemeToggle.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\SkillsSection.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\ProjectsSection.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\ContactSection.tsx"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\components\Footer.tsx"

REM Remove TypeScript assets
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\assets\icons.tsx"

REM Remove TypeScript config files
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\tailwind.config.ts"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\vite.config.ts"

REM Remove TypeScript type definitions
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\client\src\types\aos.d.ts"

REM Remove server TypeScript files
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\server\index.ts"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\server\routes.ts"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\server\trackIpRoute.ts"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\server\trackLinkRoute.ts"
del /Q "c:\Users\spide\OneDrive\ドキュメント\Desktop\portfolio\server\vite.ts"

echo TypeScript files removed successfully.
echo.
echo Note: UI component TypeScript files in client/src/components/ui/ still need to be converted to JavaScript.
echo Please convert these files manually following the same pattern as the other components.