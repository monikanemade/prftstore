// This function will be called when the block is rendered
export default async function decorate(block) {
  // 1. Get the current product's SKU from the URL or context


  // 2. Fetch data from your custom REST API endpoint

  try {

    // 3. Create the HTML elements to display the data
    const sectionContainer = document.createElement('div');
    sectionContainer.className = 'custom-api-section-container';

    const heading = document.createElement('h2');
    heading.textContent = 'Custom API Data Section';

    const dataParagraph = document.createElement('p');
    dataParagraph.textContent = `Data from API: HELLO`; // Assuming the API returns a 'message' field

    sectionContainer.append(heading, dataParagraph);
    block.append(sectionContainer);
  } catch (error) {
    console.error('Failed to fetch data from custom API:', error);
    // Optionally, display an error message
    block.textContent = 'Could not load custom data.';
  }
}