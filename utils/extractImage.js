// const axios = require('axios');
// const cheerio = require('cheerio');
// /**
//  * Extract preview image URL from a web article
//  * @param {string} url - The article URL to extract image from
//  * @returns {Promise<string|null>} - The extracted image URL or null if not found
//  */
// exports.extractImageFromUrl = async (url) => {
//     try {
//         const response = await axios.get(url);
//         const $ = cheerio.load(response.data);

//         // Try to get Open Graph image first (most reliable for previews)
//         let imageUrl = $('meta[property="og:image"]').attr('content');

//         // Fallback to Twitter card image
//         if (!imageUrl) {
//             imageUrl = $('meta[name="twitter:image"]').attr('content');
//         }

//         // Fallback to first large image in the article
//         if (!imageUrl) {
//             $('img').each((i, img) => {
//                 const src = $(img).attr('src');
//                 if (src && (src.includes('jpg') || src.includes('jpeg') || src.includes('png')) && !imageUrl) {
//                     imageUrl = src;
//                 }
//             });
//         }

//         // Convert relative URL to absolute if needed
//         if (imageUrl && !imageUrl.startsWith('http')) {
//             const urlObj = new URL(url);
//             imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
//         }

//         return imageUrl || null;
//     } catch (error) {
//         console.log("Error extracting image from URL:", error.message);
//         return null;
//     }
// }

const axios = require('axios');
const cheerio = require('cheerio');
/**
 * Extract all possible preview images from a web article
 * @param {string} url - The article URL to extract images from
 * @returns {Promise<string[]>} - Array of extracted image URLs
 */
exports.extractImageFromUrl = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const imageUrls = [];

        // Get Open Graph image (primary social sharing image)
        const ogImage = $('meta[property="og:image"]').attr('content');
        if (ogImage) {
            imageUrls.push(ogImage);
        }

        // Get Twitter card image
        const twitterImage = $('meta[name="twitter:image"]').attr('content');
        if (twitterImage && !imageUrls.includes(twitterImage)) {
            imageUrls.push(twitterImage);
        }

        // Get all article images
        $('img').each((i, img) => {
            const src = $(img).attr('src');
            if (src && (
                src.includes('.jpg') ||
                src.includes('.jpeg') ||
                src.includes('.png') ||
                src.includes('.webp') ||
                src.includes('.gif')
            )) {
                // Convert relative URL to absolute if needed
                let fullImageUrl = src;
                if (!src.startsWith('http')) {
                    const urlObj = new URL(url);
                    fullImageUrl = `${urlObj.protocol}//${urlObj.host}${src.startsWith('/') ? '' : '/'}${src}`;
                }

                // Avoid duplicates
                if (!imageUrls.includes(fullImageUrl)) {
                    imageUrls.push(fullImageUrl);
                }
            }
        });

        // Get images from picture elements and srcset
        $('picture source, img[srcset]').each((i, el) => {
            const srcset = $(el).attr('srcset');
            if (srcset) {
                // Parse srcset format: "url1 1x, url2 2x, ..."
                const srcsetUrls = srcset.split(',')
                    .map(part => part.trim().split(' ')[0])
                    .filter(url =>
                        url.includes('.jpg') ||
                        url.includes('.jpeg') ||
                        url.includes('.png') ||
                        url.includes('.webp')
                    );

                srcsetUrls.forEach(srcUrl => {
                    // Convert relative URL to absolute if needed
                    let fullImageUrl = srcUrl;
                    if (!srcUrl.startsWith('http')) {
                        const urlObj = new URL(url);
                        fullImageUrl = `${urlObj.protocol}//${urlObj.host}${srcUrl.startsWith('/') ? '' : '/'}${srcUrl}`;
                    }

                    // Avoid duplicates
                    if (!imageUrls.includes(fullImageUrl)) {
                        imageUrls.push(fullImageUrl);
                    }
                });
            }
        });

        // Get background images from style attributes
        $('[style*="background-image"]').each((i, el) => {
            const style = $(el).attr('style');
            if (style) {
                const match = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/i);
                if (match && match[1]) {
                    let bgImage = match[1];
                    // Convert relative URL to absolute if needed
                    if (!bgImage.startsWith('http')) {
                        const urlObj = new URL(url);
                        bgImage = `${urlObj.protocol}//${urlObj.host}${bgImage.startsWith('/') ? '' : '/'}${bgImage}`;
                    }

                    // Avoid duplicates
                    if (!imageUrls.includes(bgImage)) {
                        imageUrls.push(bgImage);
                    }
                }
            }
        });

        console.log(`Found ${imageUrls.length} images from ${url}`);
        return imageUrls;
    } catch (error) {
        console.log("Error extracting images from URL:", error.message);
        return [];
    }
}