# clickdummy-template
## Installation
- [nodejs installieren](https://nodejs.org/dist/v12.16.1/node-v12.16.1-x64.msi)
- [nvm installieren](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip)
- nodejs 8.17.0 per nvm installieren
    ```
    nvm install 8.17.0
    ```
- [chocolatey installieren](https://chocolatey.org/install)
- Abhängigkeiten per choco installieren (im Administrator Terminal!)
    ```
    choco install -y python2 gtk-runtime miscrosoft-build-tools libjpeg-turbo
    ```
- Cairo GTK Bundle installieren [GTK+ (x64)](http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip)
- canvas global installieren 
    ```
    npm install canvas -g
    ```
- ggf ```npm install``` als Administrator ausführen

---
---

```
z.Zt. existieren in den Abhängigkeiten des node-gyp Projekts Probleme mit NodeJS Versionen größer/gleich 11.x.x!
```
Wird also für andere Projekte eine höhere Version benötigt, dann kann das [nvm-windows](https://github.com/coreybutler/nvm-windows) helfen. Hiermit kann man verschiedene NodeJS Versionen installieren und aktivieren. 

---

## Probleme mit node-gyp und canvas

### notwendige Schritte/Downloads für Windows

Siehe [canvas Anleitung](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

Siehe [node-gyp Anleitung](https://github.com/nodejs/node-gyp#on-windows)


### GTK+ Bundles
- [GTK+ (x86)](http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip)
- [GTK+ (x64)](http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip)

#### libjpeg-turbo
- [libjpeg-turbo (x32)](https://sourceforge.net/projects/libjpeg-turbo/files/2.0.4/libjpeg-turbo-2.0.4-vc.exe/download)
- [libjpeg-turbo (x64)](https://sourceforge.net/projects/libjpeg-turbo/files/2.0.4/libjpeg-turbo-2.0.4-vc64.exe/download)
