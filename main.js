import VectorLayer from 'ol/layer/Vector.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import Map from 'ol/Map.js';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';

const source = new GeoTIFF({
  sources: [
    {
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif',
    },
  ],
});

  /**
   * A vector source for storing features in memory.
   * This source is initialized with an empty collection of features.
   * @type {VectorSource}
   */
  const vectorSource = new VectorSource({ features: [] });

/**
 * Vector layer for displaying vector features.
 * @type {import("ol/layer/Vector").default}
 * @const
 */
 const vectorLayer = new VectorLayer({
      source: vectorSource,
      opacity: 0.5,

    })


source.getView().then((viewOptions) => {
  console.log('View options:', viewOptions);
  console.log('COG resolutions:', viewOptions.resolutions);
  console.log('COG extent:', viewOptions.extent);

const view = new View({
  center: [3742028.0363054946, 1876083.683527675],
  zoom: 22.293288038700318,
  minZoom: 1,
  maxZoom: 32
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: source,
    }),
    vectorLayer
  ],
  view,
});

  view.on('change:resolution', function () {
    console.log('Current zoom level:', map.getView().getZoom());
  });
});