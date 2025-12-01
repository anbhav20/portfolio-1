@echo off
echo Removing TypeScript files...

REM Set base directory (current folder)
set BASE=%cd%

REM Remove core TypeScript files
del /Q "%BASE%\client\src\App.tsx"
del /Q "%BASE%\client\src\main.tsx"

REM Remove TypeScript versions of pages
del /Q "%BASE%\client\src\pages\Home.tsx"
del /Q "%BASE%\client\src\pages\not-found.tsx"
del /Q "%BASE%\client\src\pages\Portfolio.tsx"
del /Q "%BASE%\client\src\pages\TrackingRedirect.tsx"

REM Remove TypeScript versions of hooks
del /Q "%BASE%\client\src\hooks\use-mobile.tsx"
del /Q "%BASE%\client\src\hooks\use-toast.ts"
del /Q "%BASE%\client\src\hooks\useTypingEffect.tsx"

REM Remove TypeScript versions of lib files
del /Q "%BASE%\client\src\lib\formValidation.ts"
del /Q "%BASE%\client\src\lib\queryClient.ts"
del /Q "%BASE%\client\src\lib\utils.ts"

REM Remove TypeScript versions of components
del /Q "%BASE%\client\src\components\EntranceAnimation.tsx"
del /Q "%BASE%\client\src\components\Header.tsx"
del /Q "%BASE%\client\src\components\HeroSection.tsx"
del /Q "%BASE%\client\src\components\ScrollToTop.tsx"
del /Q "%BASE%\client\src\components\ThemeProvider.tsx"
del /Q "%BASE%\client\src\components\ThemeToggle.tsx"
del /Q "%BASE%\client\src\components\SkillsSection.tsx"
del /Q "%BASE%\client\src\components\ProjectsSection.tsx"
del /Q "%BASE%\client\src\components\ContactSection.tsx"
del /Q "%BASE%\client\src\components\Footer.tsx"

REM Remove TypeScript assets
del /Q "%BASE%\client\src\assets\icons.tsx"

REM Remove TypeScript config files
del /Q "%BASE%\tailwind.config.ts"
del /Q "%BASE%\vite.config.ts"

REM Remove TypeScript type definitions
del /Q "%BASE%\client\src\types\aos.d.ts"

REM Remove server TypeScript files
del /Q "%BASE%\server\index.ts"
del /Q "%BASE%\server\routes.ts"
del /Q "%BASE%\server\trackIpRoute.ts"
del /Q "%BASE%\server\trackLinkRoute.ts"
del /Q "%BASE%\server\vite.ts"

echo TypeScript files removed successfully.
echo.
echo Note: UI component TypeScript files in client/src/components/ui/ still need to be converted manually.
