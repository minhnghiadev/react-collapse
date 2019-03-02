/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import gzip from 'gzip-size';

export default function sizes(options) {
  return {
    name: 'scripts/rollup/plugins/sizes-plugin',
    ongenerate(bundle, obj) {
      const size = Buffer.byteLength(obj.code);
      const gzipSize = gzip.sync(obj.code);

      options.getSize(size, gzipSize);
    },
  };
}
