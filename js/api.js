async function fetchProducts() {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return[];
    }
}