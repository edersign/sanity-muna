# Sanity Plugin IIIF Manifest Input

Add a IIIF viewer for IIIF Manifest urls.

You might get CORS issues with this plugin. api.nb.no at least makes IIIF a bit easier :-).

## Installation

1. `sanity install iiif-manifest-input`
2. In your schema:

```js
...,
{
  title: "IIIF Manifest",
  description: "URL to the manifest",
  name: "iiifManifest",
  type: "iiifManifest", // <- The important part
},
...
```
