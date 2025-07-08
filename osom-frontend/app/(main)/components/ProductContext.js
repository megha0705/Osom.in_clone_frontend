"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://osom-in-clone-backend-8.onrender.com/product/getAll", {
          cache: "no-store"
        });
        const data = await res.json();
        setAllProducts(data);
        setFilteredProducts(data.slice(0, 8)); // Default
      } catch (err) {
        console.error("Product fetch failed:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    // 🔍 Search logic
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const desc = product.description?.toLowerCase() || "";
        const categories = product.product_category?.map(c => c.category_name.toLowerCase()).join(" ") || "";
        return name.includes(query) || desc.includes(query) || categories.includes(query);
      });
    } else if (selectedCategory) {
      // 🏷️ Category logic
      filtered = filtered.filter((product) =>
        product.product_category?.some(
          (cat) => cat.category_name.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    } else {
      // 🟢 Default
      filtered = filtered.slice(0, 8);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, allProducts]);

  return (
    <ProductContext.Provider value={{
      filteredProducts,
      setSelectedCategory,
      setSearchQuery,
      searchQuery
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
