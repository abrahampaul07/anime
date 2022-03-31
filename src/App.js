import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';


function App() {

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    s:'',
    page: 1
  })

  const perPage = 4;

  useEffect(() => {
    (
      async() => {
        const response = await fetch("https://api.jikan.moe/v3/search/anime?q=naruto&limit=16");
        const content = await response.json();
        setAllProducts(content.results);
        setFilteredProducts(content.results.slice(0, filters.page * perPage));
      }
    )()
  },[])

  useEffect(() => {
    let products = allProducts.filter(p => p.title.toLowerCase().indexOf(filters.s.toLowerCase()) >=0);

    
    setFilteredProducts(products.slice(0, filters.page * perPage));
  },[filters])

  return (
    <div>
      <Main products={filteredProducts} filters={filters} setFilters={setFilters}/>
    </div>
  );

}

export default App;