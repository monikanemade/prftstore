export default async function decorate(block) {
  try {
    // 3. Create the HTML elements to display the data
    const sectionContainer = document.createElement('div');
    sectionContainer.className = 'custom-api-section-container';

    const heading = document.createElement('h2');
    heading.textContent = 'Custom API Data Section';

    const dataParagraph = document.createElement('p');
    dataParagraph.textContent = 'Data from API: HELLO'; // Assuming the API returns a 'message' field

    sectionContainer.append(heading, dataParagraph);
    block.append(sectionContainer);
  } catch (error) {
    console.error('Failed to fetch data from custom API:', error);
    // Optionally, display an error message
    block.textContent = 'Could not load custom data.';
  }
}
