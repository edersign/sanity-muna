import React from 'react';
import { OpenSeadragonViewer } from "openseadragon-react-viewer"

export const IIIFManifest = ({manifest}) => {
  // Get your manifest from somewhere
  const manifestUrl = manifest;

  // Options to show/hide extra UI features in the viewer
  // height(in pixels) option is default to 800 for wide-screens and 500 for narrow-screens
  // All other options default to 'true'
  const options = {
    showDropdown: true,
    showThumbnails: false,
    showToolbar: true,
    deepLinking: false,
    height: 400,
  };

  return (
    <OpenSeadragonViewer manifestUrl={manifestUrl} options={options} />
  );
}
