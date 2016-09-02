/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';





/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","d998b11630265be87d0d57459ecf0474"],["/bower_components/app-layout/app-drawer/app-drawer.html","8eb35d55f1e9a0e1db1aeb6bddbcc325"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","180db0000b27f96610bf1a8de988a3ab"],["/bower_components/app-layout/app-header/app-header.html","e4a8a8d2985df42fad5c12ccd241e0c8"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","75c6cd96562486865e681f0a07578d69"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","1eaa9e05144414be49e4ee23e16ceca2"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","4723ce7f6429640a812ad866ddddb719"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","3929482c600a21680def557965850501"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","271fe6e745f1a9581a6e01cb3aadce21"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","391d025dcffee3f042c9d2bdd83be377"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","fad90269cea2f83e1f4df1950bb2b053"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","1b99a57f871235783db6dfb812d7f3e0"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","a21d6a2fc019eb59d10586aada74313e"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","bde0a79d3265bef565ee86c699b6bbae"],["/bower_components/app-layout/helpers/helpers.html","95b52c0c05f77b65bc1b5dc0715d2495"],["/bower_components/app-route/app-location.html","52b3d8b5ecbb838b41bd9bd0ae556cca"],["/bower_components/app-route/app-route-converter-behavior.html","0e5b36ae9988a88bb30729fdb99a5d94"],["/bower_components/app-route/app-route.html","624ca199d36389f3db04597a593548ec"],["/bower_components/app-storage/app-network-status-behavior.html","da5ca8e23c23932448b728ee17c1234e"],["/bower_components/app-storage/app-storage-behavior.html","009d20c8051259c21d6095736d7213ab"],["/bower_components/firebase/firebase.js","33c3d4641586aa54346cf20bd3cfa2d2"],["/bower_components/google-apis/google-maps-api.html","e4eb1641cec251f631cec2f569e8a551"],["/bower_components/google-map/google-map-directions.html","5df6b2a346233028ac286418093f8628"],["/bower_components/google-map/google-map-marker.html","d4432d8c2b75325d455c0f975d76107a"],["/bower_components/google-map/google-map-search.html","ea5cc3f3955c743c125bd9ea63cfa935"],["/bower_components/google-map/google-map.html","534168cabc1c04eb05da60af3b687a10"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","b9a8e766d0ab03a5d13e275754ec3d54"],["/bower_components/iron-behaviors/iron-button-state.html","6565a80d1af09299c1201f8286849c3b"],["/bower_components/iron-behaviors/iron-control-state.html","1c12ee539b1dbbd0957ae26b3549cc13"],["/bower_components/iron-flex-layout/iron-flex-layout.html","3987521c615734e4fe403f9acecfea54"],["/bower_components/iron-icon/iron-icon.html","5da6bac1d18d267691395cdc75820761"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","8fb45b1b4668dae069f5efb5004c2af4"],["/bower_components/iron-jsonp-library/iron-jsonp-library.html","2278dab473da8287511ea8f8eb30144d"],["/bower_components/iron-location/iron-location.html","b999e8754a2e8fdde266884e47cefa04"],["/bower_components/iron-location/iron-query-params.html","065a00285a46f8483c74e363945499c9"],["/bower_components/iron-media-query/iron-media-query.html","7436f9608ebd2d31e4b346921651f84b"],["/bower_components/iron-meta/iron-meta.html","dd4ef14e09c5771e70292d70963f6718"],["/bower_components/iron-pages/iron-pages.html","5872a2ad58225c94b14ddea747f67cbd"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","e93449ccd4312e4e30060c87bd52ed25"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","0185cbe8d7139c9e92af3a9af67feb17"],["/bower_components/iron-selector/iron-multi-selectable.html","46d6620acd7bad986d81097d9ca91692"],["/bower_components/iron-selector/iron-selectable.html","65b04f3f5f1b551d91a82b36f916f6b6"],["/bower_components/iron-selector/iron-selection.html","83545b7d1eae4020594969e6b9790b65"],["/bower_components/iron-selector/iron-selector.html","4d2657550768bec0788eba5190cddc66"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","51a1c5ccd2aae4c1a0258680dcb3e1ea"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","b6ee8dd59ffb46ca57e81311abd2eca0"],["/bower_components/paper-icon-button/paper-icon-button.html","2a75de00f858ae1e894ab21344464787"],["/bower_components/paper-ripple/paper-ripple.html","e22bc21b61184cb28125d16f9d80fb59"],["/bower_components/paper-styles/color.html","430305db311431da78c0a6e1236f9ebe"],["/bower_components/paper-styles/default-theme.html","c910188e898624eb890898418de20ee0"],["/bower_components/polymer/polymer-micro.html","7739e37db5581472b91925e5fa9bde55"],["/bower_components/polymer/polymer-mini.html","9e9dfb157eae29a59c98343288d4d120"],["/bower_components/polymer/polymer.html","2dce719d53b7ea549067d3d21a2b2c29"],["/bower_components/polymerfire/firebase-app.html","c13dbf9342a6412ac40fea3ead9b8096"],["/bower_components/polymerfire/firebase-auth.html","3c91fc02dfff7111ec5738345431b03b"],["/bower_components/polymerfire/firebase-common-behavior.html","4292f8711efdc558f003299e5e8bd2bb"],["/bower_components/polymerfire/firebase-database-behavior.html","2d5d1d040ba3189b441d622c0aa715bc"],["/bower_components/polymerfire/firebase-document.html","9b6d4b883e14a89bf4bad27e00779408"],["/bower_components/polymerfire/firebase-query.html","80ffdecb767aac979b385074a409e7c9"],["/bower_components/polymerfire/firebase.html","4f28951d4ca113234446d04a53364b10"],["/bower_components/polymerfire/polymerfire.html","ffc2b814331fab50a4a263beb093848b"],["/bower_components/promise-polyfill/Promise-Statics.js","a4fbefd3bdb3ab76e6e7f788a902f7ba"],["/bower_components/promise-polyfill/Promise.js","5afb14fd81497aca81bf25929d65b02d"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","06470312beff013fc54695e0bdda2cb3"],["/bower_components/promise-polyfill/promise-polyfill.html","97dd009429dbc654aa105abcd0dfb927"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","f04ed23700daeb36f637bfe095960659"],["/index.html","2c6f2e9f20d1a01e89876a52570fee95"],["/manifest.json","c3263c7a9f61be18f0f70c8e3d27e333"],["/src/fw-maps/fw-maps.html","5b9c05dbb6fbeae9566640bb2e0bec54"],["/src/fw-maps/fw-maps.js","41852df186e97140ea3f5b3260486b3a"],["/src/my-app.html","1c8ab06b384d685b2171247e96b5f27d"],["/src/my-icons.html","0d6d353f9f4a704b3c4ae19250d3cdc5"],["/src/my-view1.html","3ae2b671913decfb7084aeaeeb9c5c3f"],["/src/my-view2.html","16f82b003eabd9c9424391b9d75d17f9"],["/src/my-view3.html","74bb1fd52df3785b6dd81a3c5343bb41"],["/src/my-view404.html","c0193cc44fd7bde68deda31d231845a8"],["/src/shared-styles.html","7e01d8ed2a44be72448914190139292d"],["/src/smart-map/smart-map.html","8e5bb7818cb66eabd562ef543d009e66"],["/src/smart-map/smart-map.js","98262776d4eecf31415e9b431437458a"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '/index.html';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




