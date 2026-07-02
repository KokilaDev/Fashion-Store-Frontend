import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/products/ProductCard';
import { Grid3X3, Filter, SlidersHorizontal, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES_LIST = ["All", "Frocks", "Blouses", "Tops", "Skirts", "Party Wear", "Jeans", "Trousers", "Suits"];

export const ProductsPage: React.FC = () => {
  const { allProducts, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useStore();
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc' | 'rating'>('default');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  const sortedProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];
    if (sortBy === 'priceAsc') {
      return productsCopy.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'priceDesc') {
      return productsCopy.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return productsCopy.sort((a, b) => b.rating - a.rating);
    }
    return productsCopy;
  }, [filteredProducts, sortBy]);

  return (
    <div id="products-catalogue" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      {/* Breadcrumb path */}
      <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-6">
        <Link to="/" className="hover:text-charcoal-900 transition-colors">AURA</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal-900 font-bold">COLLECTIONS</span>
        {selectedCategory !== 'All' && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold-600 font-bold">{selectedCategory}</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Filter Sidebar (Column Span 3) */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <div className="border-b border-neutral-200 pb-4">
            <h2 className="text-xs font-bold tracking-widest uppercase text-charcoal-900 mb-1 flex items-center gap-1.5">
              <Filter className="w-4 h-4" />
              <span>FILTER ATELIER</span>
            </h2>
            <p className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider">Refine luxury search</p>
          </div>

          {/* Search within Results */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">SEARCH RESULTS</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-neutral-200 rounded text-xs font-semibold focus:outline-none focus:border-charcoal-900 text-neutral-800"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-400" />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">CATEGORIES</label>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3 py-2 text-xs font-medium rounded transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-charcoal-900 text-white font-bold'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-charcoal-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Side: Product Catalog (Column Span 9) */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          {/* Catalog Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-neutral-100 p-4 rounded-xl">
            <div>
              <p className="text-xs text-neutral-500 font-medium">
                Showing <span className="font-bold text-charcoal-900">{sortedProducts.length}</span> luxury pieces
              </p>
              {searchQuery && (
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Filtered by word: <b className="text-charcoal-900">"{searchQuery}"</b>
                </p>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs self-end sm:self-auto">
              <SlidersHorizontal className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-neutral-200 rounded px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-charcoal-900 bg-white"
              >
                <option value="default">Release Date</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-neutral-100 rounded-xl">
              <Grid3X3 className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="font-serif text-lg font-bold text-neutral-800">No Pieces Found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
                We couldn't match any Aura garments to your exact filters. Try adjusting your category choices or clearing your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-6 px-6 py-2.5 bg-charcoal-900 hover:bg-gold-600 text-white font-bold text-[10px] tracking-widest uppercase rounded cursor-pointer transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
