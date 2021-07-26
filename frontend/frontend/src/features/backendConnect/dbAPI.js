export const updateddb = async (bodyContent) => {
  const rawResponse = await fetch('http://localhost:8000/products/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyContent),
  });
  return rawResponse.json();
};

export const getData = async () => {
  const rawResponse = await fetch('http://localhost:8000/products_data');

  return rawResponse.json();
};

export const getCategories = async () => {
  const rawResponse = await fetch('http://localhost:8000/categories');
  return rawResponse.json();
};

export const getSubCategories = async () => {
  const rawResponse = await fetch('http://localhost:8000/subcategories');
  return rawResponse.json();
};
