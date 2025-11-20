import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockProducts } from '@/lib/products';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  type: 'product' | 'category';
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('tamaravastra-search-history');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered: SearchResult[] = [];

    mockProducts.forEach(product => {
      if (
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
      ) {
        filtered.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category.replace('-', ' '),
          type: 'product',
        });
      }
    });

    const categories = ['silk', 'cotton', 'party wear', 'designer'];
    categories.forEach(cat => {
      if (cat.includes(lowerQuery) && !filtered.some(r => r.type === 'category' && r.category === cat)) {
        filtered.push({
          id: cat,
          name: `Shop ${cat}`,
          price: 0,
          image: '',
          category: cat,
          type: 'category',
        });
      }
    });

    setResults(filtered.slice(0, 8));
  }, []);

  const handleSelectResult = (result: SearchResult) => {
    if (searchQuery.trim() && !searchHistory.includes(searchQuery)) {
      const newHistory = [searchQuery, ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('tamaravastra-search-history', JSON.stringify(newHistory));
    }
    setOpen(false);
    setSearchQuery('');
    setResults([]);
  };

  const handleCategorySearch = (category: string) => {
    handleSelectResult({
      id: category,
      name: `Shop ${category}`,
      price: 0,
      image: '',
      category: category,
      type: 'category',
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="hover:bg-transparent group"
      >
        <Search className="h-5 w-5 group-hover:text-accent transition-smooth" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-2xl p-0 gap-0 rounded-lg border-border/50">
          <DialogHeader className="border-b border-border/50 p-4 pb-0">
            <DialogTitle className="sr-only">Search Products</DialogTitle>
            <DialogDescription className="sr-only">Find products and categories</DialogDescription>
            <div className="relative w-full pt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
                className="pl-10 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setResults([]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </DialogHeader>

          <div className="max-h-[400px] overflow-y-auto p-4">
            {searchQuery ? (
              results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      to={result.type === 'product' ? `/product/${result.id}` : `/catalogue?category=${result.category.replace(' ', '-')}`}
                      onClick={() => handleSelectResult(result)}
                      className="block"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-smooth cursor-pointer">
                        {result.type === 'product' && result.image && (
                          <img
                            src={result.image}
                            alt={result.name}
                            className="h-12 w-12 object-cover rounded"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{result.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {result.type === 'category' ? 'Category' : result.category}
                          </p>
                        </div>
                        {result.type === 'product' && (
                          <p className="text-sm font-bold text-accent whitespace-nowrap">
                            ₹{result.price.toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try searching for different keywords or browse our categories
                  </p>
                </div>
              )
            ) : searchHistory.length > 0 ? (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  Recent Searches
                </p>
                <div className="space-y-2 mb-6">
                  {searchHistory.map((query, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(query)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-accent/10 transition-smooth text-left"
                    >
                      <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{query}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {!searchQuery && (
              <>
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  Browse Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {['Silk', 'Cotton', 'Party Wear', 'Designer'].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySearch(category.toLowerCase())}
                      className="p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-smooth text-left"
                    >
                      <p className="text-sm font-medium">{category}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
