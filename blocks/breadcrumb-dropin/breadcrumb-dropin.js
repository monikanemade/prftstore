/**
 * A block to display a breadcrumb trail on a Product Details Page (PDP).
 * This block is designed to be used as a "dropin," meaning it has no companion CSS file.
 *
 * NOTE: The getBreadcrumbs function is mocked here for a self-contained example.
 * In your actual AEM boilerplate, you would import it from:
 * import { getBreadcrumbs } from '../../scripts/commerce.js';
 */

/**
 * Mocks the getBreadcrumbs function from the commerce.js file.
 * In a real project, this function would dynamically get the breadcrumb data
 * for the current product from the storefront context.
 * @returns {Promise<Array>} A promise that resolves with an array of breadcrumb objects.
 */
async function getBreadcrumbs() {
  const pathSegments = window.location.pathname.split('/').filter(segment => segment.length > 0);
  const breadcrumbs = [];
  let currentPath = '';

  // Start with a "Home" breadcrumb.
  breadcrumbs.push({ name: 'Home', url: '/' });

  // Dynamically build breadcrumbs from the URL path.
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    if (index < pathSegments.length - 1) {
      breadcrumbs.push({ name: segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), url: currentPath });
    } else {
      // The last segment is the product, which is not a link.
      breadcrumbs.push({ name: segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), url: null });
    }
  });

  return breadcrumbs;
}

/**
 * The main function to decorate the breadcrumb block.
 * This is automatically called by the AEM boilerplate framework when the block is included in a document.
 * @param {HTMLElement} block The DOM element representing the block.
 */
export default async function decorate(block) {
  block.innerHTML = '<p class="text-gray-500">Loading breadcrumbs...</p>';

  try {
    const breadcrumbs = await getBreadcrumbs();
    
    // Clear the loading state.
    block.innerHTML = '';

    if (!breadcrumbs || breadcrumbs.length <= 1) {
      block.remove(); // Remove the block if there's no breadcrumb data.
      return;
    }

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Breadcrumb');
    
    const ol = document.createElement('ol');
    ol.className = 'flex flex-wrap items-center space-x-2';

    breadcrumbs.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'flex items-center space-x-2';
      
      const textElement = document.createElement(item.url ? 'a' : 'span');
      textElement.textContent = item.name;
      textElement.className = 'text-sm';

      if (item.url) {
        textElement.href = item.url;
        textElement.className += ' text-blue-600 hover:text-blue-800 transition-colors';
      } else {
        textElement.className += ' text-gray-500 font-semibold';
      }

      li.appendChild(textElement);

      if (index < breadcrumbs.length - 1) {
        const separator = document.createElement('span');
        separator.className = 'text-gray-400';
        separator.textContent = '/';
        li.appendChild(separator);
      }
      
      ol.appendChild(li);
    });

    nav.appendChild(ol);
    block.appendChild(nav);

  } catch (error) {
    console.error('Failed to load breadcrumbs:', error);
    block.innerHTML = '<p class="text-red-500">Could not load breadcrumbs.</p>';
  }
}