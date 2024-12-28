import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

interface ThemeData {
  [key: string]: string
}

/**
 * Vite plugin to combine theme JSON files into CSS
 */
export default function themePlugin(): Plugin {
  const themePath = path.resolve('src/theme')
  const jsonFiles = ['fluentLight.json', 'fluentDark.json', 'SharepointBlueLight.json', 'SharepointBlueDark.json', 'theme.json']

  return {
    name: 'vite-plugin-theme-combiner',

    configureServer(server) {
      // Watch the JSON files for changes
      const watchPaths = jsonFiles.map(file => path.join(themePath, file))

      // Add files to Vite's watcher
      watchPaths.forEach(filePath => {
        server.watcher.add(filePath)
      })

      // Handle file changes
      server.watcher.on('change', (file: string) => {
        if (file.includes('theme') && file.endsWith('.json')) {
          console.log(`Theme file changed: ${file}`)
          generateThemeCSS(themePath)
        }
      })
    },

    buildStart() {
      // Generate initial CSS file
      generateThemeCSS(themePath)
    }
  }
}

/**
 * Combines JSON files and generates theme.css
 * @param themePath - Path to theme directory
 */
function generateThemeCSS(themePath: string): void {
  var themeVars: string = "";
  var darkVars: string = "";
  const outputPath = path.join(themePath, 'theme.css');

  try {
    const theme: ThemeData = JSON.parse(fs.readFileSync(path.join(themePath, 'theme.json'), 'utf-8'));
    const light: ThemeData = JSON.parse(fs.readFileSync(path.join(themePath, 'fluentLight.json'), 'utf-8'));
    const dark: ThemeData = JSON.parse(fs.readFileSync(path.join(themePath, 'fluentDark.json'), 'utf-8'));

    // based on https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/site-theming/sharepoint-site-theming-json-schema
    // https://fluentuipr.z22.web.core.windows.net/heads/master/theming-designer/index.html
    const SharepointBlueDark: ThemeData = JSON.parse(fs.readFileSync(path.join(themePath, 'SharepointBlueDark.json'), 'utf-8'));
    const SharepointBlueLight: ThemeData = JSON.parse(fs.readFileSync(path.join(themePath, 'SharepointBlueLight.json'), 'utf-8'));
    


    for (const name in theme) {
      themeVars = themeVars + createVar(name, theme[name], light, SharepointBlueLight);

      if (name.startsWith('color')) {
        darkVars = darkVars + createVar(name, theme[name], dark, SharepointBlueDark);
      }
    }

    // Convert to CSS string (placeholder logic)
    const css = `/* Generated theme.css - to not modify directly */
/* Timestamp: ${new Date().toISOString()} */

@theme {
  ${themeVars}
}

@layer theme {
  .dark {    
  ${darkVars}
  }
}

`

    // Write to theme.css
    fs.writeFileSync(outputPath, css)
    console.log('Theme CSS generated successfully')
  } catch (error) {
    console.error('Error generating theme CSS:', error)
  }
  function createVar(cssvar: string, token: string, fluentTheme: ThemeData, SharepointTheme:ThemeData): string {
    
    var value: any = fluentTheme[token];
    if (value === undefined) value = SharepointTheme[token]; // fallback to Sharepoint theme definition when not found in Fluent theme

    if (cssvar.startsWith('font')) value = (value as string).split(',').map(font => font.trim());

    return `    --${cssvar}: ${value};\n`;
  }
}

