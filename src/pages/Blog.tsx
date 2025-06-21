
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
import { Filter, Grid, List, SortAsc, SortDesc, Zap, Award } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'popular' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ReadingProgress />
      <BlogHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{blogPosts.length}</div>
              <div className="text-sm opacity-90">Total Articles</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-sm opacity-90">Categories</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-sm opacity-90">Monthly Readers</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        <FeaturedPosts posts={blogPosts} />
        
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {selectedCategory ? `${selectedCategory} Articles` : 'All Articles'}
                </h2>
                <p className="text-gray-600 flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-2"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Sort by</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:border-blue-500"
                      >
                        <option value="date">Date</option>
                        <option value="title">Title</option>
                        <option value="popular">Popularity</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Order</label>
                      <Button
                        variant="outline"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="w-full justify-start"
                      >
                        {sortOrder === 'desc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
                        {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Quick Filters</label>
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          className="cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600"
                          onClick={() => setSelectedCategory(selectedCategory === 'Featured' ? '' : 'Featured')}
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {filteredPosts.length === 0 ? (
              <Card className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <CardContent>
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-3">No articles found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search terms or browse different categories.</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-8' : 'space-y-6'}>
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Newsletter signup */}
            <div className="mt-16">
              <NewsletterSignup />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <BlogSidebar
              recentPosts={recentPosts}
              categories={categories}
              popularTags={popularTags}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
