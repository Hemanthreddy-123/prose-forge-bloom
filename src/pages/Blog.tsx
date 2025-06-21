
import { useState, useMemo } from 'react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogCard from '@/components/blog/BlogCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import ReadingProgress from '@/components/blog/ReadingProgress';
import { blogPosts, categories } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Grid, List, SortAsc, SortDesc, Zap, Award, RefreshCw, Download, BookOpen, TrendingUp } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'popular' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log('Refreshing blog posts...');
    setTimeout(() => {
      setIsRefreshing(false);
      console.log('Blog posts refreshed');
    }, 1500);
  };

  const handleExport = () => {
    console.log('Exporting blog data...');
    const dataStr = JSON.stringify(filteredPosts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'blog-posts.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleClearFilters = () => {
    console.log('Clearing all filters...');
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('date');
    setSortOrder('desc');
  };

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'popular':
          comparison = (a.featured ? 1 : 0) - (b.featured ? 1 : 0);
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  const recentPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  }, []);

  const popularTags = useMemo(() => {
    const tagCount = new Map();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    });
    
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([tag]) => tag);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ReadingProgress />
      <BlogHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <div className="text-3xl font-bold mb-1">{blogPosts.length}</div>
              <div className="text-sm text-blue-200">Total Articles</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-3 text-purple-200" />
              <div className="text-3xl font-bold mb-1">{categories.length}</div>
              <div className="text-sm text-purple-200">Categories</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-green-200" />
              <div className="text-3xl font-bold mb-1">25K+</div>
              <div className="text-sm text-green-200">Monthly Readers</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-3 text-orange-200" />
              <div className="text-3xl font-bold mb-1">4.9</div>
              <div className="text-sm text-orange-200">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        <FeaturedPosts posts={blogPosts} />
        
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Enhanced Controls */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  {selectedCategory ? `${selectedCategory} Articles` : 'Discover Amazing Content'}
                </h2>
                <p className="text-gray-600 flex items-center text-lg">
                  <Award className="h-5 w-5 mr-2 text-blue-600" />
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="sm"
                  disabled={isRefreshing}
                  className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </Button>

                <Button
                  onClick={handleExport}
                  variant="outline"
                  size="sm"
                  className="border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters {showFilters ? '▲' : '▼'}
                </Button>
                
                <div className="flex items-center border-2 border-gray-300 rounded-lg bg-white shadow-sm">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setViewMode('grid');
                      console.log('Switched to grid view');
                    }}
                    className="rounded-r-none border-r"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setViewMode('list');
                      console.log('Switched to list view');
                    }}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Filters */}
            {showFilters && (
              <Card className="mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700">Sort by</label>
                      <select
                        value={sortBy}
                        onChange={(e) => {
                          setSortBy(e.target.value as any);
                          console.log('Sort changed to:', e.target.value);
                        }}
                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
                      >
                        <option value="date">Publication Date</option>
                        <option value="title">Title (A-Z)</option>
                        <option value="popular">Popularity</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700">Order</label>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                          setSortOrder(newOrder);
                          console.log('Sort order changed to:', newOrder);
                        }}
                        className="w-full justify-start border-2 hover:bg-blue-50 transition-all duration-200"
                      >
                        {sortOrder === 'desc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
                        {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700">Quick Filters</label>
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          className="cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 px-4 py-2 text-sm font-medium"
                          onClick={() => {
                            const newCategory = selectedCategory === 'Featured' ? '' : 'Featured';
                            setSelectedCategory(newCategory);
                            console.log('Featured filter toggled:', newCategory);
                          }}
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700">Actions</label>
                      <Button 
                        onClick={handleClearFilters}
                        variant="outline"
                        className="w-full border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {filteredPosts.length === 0 ? (
              <Card className="text-center py-20 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-dashed border-gray-300">
                <CardContent>
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-3xl font-bold text-gray-700 mb-4">No articles found</h3>
                  <p className="text-gray-600 mb-8 text-lg">Try adjusting your search terms or browse different categories.</p>
                  <Button 
                    onClick={handleClearFilters}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-8' : 'space-y-8'}>
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Newsletter signup */}
            <div className="mt-20">
              <NewsletterSignup />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <BlogSidebar
              recentPosts={recentPosts}
              categories={categories}
              popularTags={popularTags}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                console.log('Category selected:', category);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
