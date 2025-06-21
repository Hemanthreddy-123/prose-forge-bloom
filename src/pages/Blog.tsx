
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
import { Filter, Grid, List, SortAsc, SortDesc, Zap, Award, RefreshCw, Download, BookOpen, TrendingUp, Phone, Mail, MapPin } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <ReadingProgress />
      <BlogHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Contact Information - Indian Style */}
        <div className="mb-12 bg-gradient-to-r from-orange-100 via-white to-green-100 rounded-2xl p-8 border-l-8 border-orange-500 border-r-8 border-green-500 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            🇮🇳 हमसे संपर्क करें / Contact Us
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-white p-6 rounded-xl shadow-md border-2 border-orange-200 hover:border-orange-400 transition-all duration-300">
              <Phone className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-bold text-lg text-gray-800 mb-2">फोन / Phone</h3>
              <p className="text-blue-600 font-semibold">+91 98765 43210</p>
              <p className="text-green-600">+91 87654 32109</p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-md border-2 border-blue-200 hover:border-blue-400 transition-all duration-300">
              <Mail className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg text-gray-800 mb-2">ईमेल / Email</h3>
              <p className="text-orange-600 font-semibold">info@example.com</p>
              <p className="text-green-600">support@example.com</p>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-md border-2 border-green-200 hover:border-green-400 transition-all duration-300">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <h3 className="font-bold text-lg text-gray-800 mb-2">पता / Address</h3>
              <p className="text-purple-600 font-semibold">Mumbai, Maharashtra</p>
              <p className="text-blue-600">India - 400001</p>
            </div>
          </div>
        </div>

        {/* Enhanced Quick stats with Indian Colors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card style={{background: 'linear-gradient(135deg, #ff9933, #ff6600)'}} className="text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-3 text-orange-100" />
              <div className="text-3xl font-bold mb-1">{blogPosts.length}</div>
              <div className="text-sm text-orange-100">कुल लेख / Total Articles</div>
            </CardContent>
          </Card>
          <Card style={{background: 'linear-gradient(135deg, #128807, #0d5d03)'}} className="text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-3 text-green-200" />
              <div className="text-3xl font-bold mb-1">{categories.length}</div>
              <div className="text-sm text-green-200">श्रेणियां / Categories</div>
            </CardContent>
          </Card>
          <Card style={{background: 'linear-gradient(135deg, #000080, #4169e1)'}} className="text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <div className="text-3xl font-bold mb-1">25K+</div>
              <div className="text-sm text-blue-200">मासिक पाठक / Monthly Readers</div>
            </CardContent>
          </Card>
          <Card style={{background: 'linear-gradient(135deg, #800080, #9932cc)'}} className="text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-3 text-purple-200" />
              <div className="text-3xl font-bold mb-1">4.9</div>
              <div className="text-sm text-purple-200">औसत रेटिंग / Average Rating</div>
            </CardContent>
          </Card>
        </div>

        <FeaturedPosts posts={blogPosts} />
        
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Enhanced Controls with Indian Theme */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
                  {selectedCategory ? `${selectedCategory} लेख / Articles` : 'अद्भुत सामग्री खोजें / Discover Amazing Content'}
                </h2>
                <p className="text-gray-600 flex items-center text-lg">
                  <Award className="h-5 w-5 mr-2 text-orange-600" />
                  {filteredPosts.length} लेख मिले / article{filteredPosts.length !== 1 ? 's' : ''} found
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    border: 'none'
                  }}
                  className="transition-all duration-200 px-4 py-2 rounded-xl hover:scale-105 shadow-lg"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'रिफ्रेश हो रहा... / Refreshing...' : 'रिफ्रेश / Refresh'}
                </Button>

                <Button
                  onClick={handleExport}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none'
                  }}
                  className="transition-all duration-200 px-4 py-2 rounded-xl hover:scale-105 shadow-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  एक्सपोर्ट / Export
                </Button>
                
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: 'white',
                    border: 'none'
                  }}
                  className="transition-all duration-200 px-4 py-2 rounded-xl hover:scale-105 shadow-lg"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  फिल्टर / Filters {showFilters ? '▲' : '▼'}
                </Button>
                
                <div className="flex items-center bg-white rounded-xl shadow-lg border-2 border-gray-200">
                  <Button
                    onClick={() => {
                      setViewMode('grid');
                      console.log('Switched to grid view');
                    }}
                    style={{
                      background: viewMode === 'grid' 
                        ? 'linear-gradient(135deg, #ff9933, #ff6600)' 
                        : 'transparent',
                      color: viewMode === 'grid' ? 'white' : '#666'
                    }}
                    className="rounded-r-none px-3 py-2 transition-all duration-200"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      setViewMode('list');
                      console.log('Switched to list view');
                    }}
                    style={{
                      background: viewMode === 'list' 
                        ? 'linear-gradient(135deg, #ff9933, #ff6600)' 
                        : 'transparent',
                      color: viewMode === 'list' ? 'white' : '#666'
                    }}
                    className="rounded-l-none px-3 py-2 transition-all duration-200"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Filters with Indian Theme */}
            {showFilters && (
              <Card className="mb-8 bg-gradient-to-r from-orange-50 via-white to-green-50 border-l-4 border-orange-500 border-r-4 border-green-500 shadow-lg">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700">क्रमबद्ध करें / Sort by</label>
                      <select
                        value={sortBy}
                        onChange={(e) => {
                          setSortBy(e.target.value as any);
                          console.log('Sort changed to:', e.target.value);
                        }}
                        className="w-full border-2 border-orange-300 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white shadow-sm"
                      >
                        <option value="date">प्रकाशन दिनांक / Publication Date</option>
                        <option value="title">शीर्षक / Title (A-Z)</option>
                        <option value="popular">लोकप्रियता / Popularity</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700">क्रम / Order</label>
                      <Button
                        onClick={() => {
                          const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                          setSortOrder(newOrder);
                          console.log('Sort order changed to:', newOrder);
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                          color: '#374151',
                          border: '2px solid #d1d5db'
                        }}
                        className="w-full justify-start transition-all duration-200 rounded-xl hover:scale-105"
                      >
                        {sortOrder === 'desc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
                        {sortOrder === 'desc' ? 'नवीनतम पहले / Newest First' : 'पुराने पहले / Oldest First'}
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700">त्वरित फिल्टर / Quick Filters</label>
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          onClick={() => {
                            const newCategory = selectedCategory === 'Featured' ? '' : 'Featured';
                            setSelectedCategory(newCategory);
                            console.log('Featured filter toggled:', newCategory);
                          }}
                          style={{
                            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                            color: 'white',
                            cursor: 'pointer'
                          }}
                          className="transition-all duration-200 px-4 py-2 text-sm font-medium rounded-xl hover:scale-105 shadow-lg"
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          फीचर्ड / Featured
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700">क्रियाएं / Actions</label>
                      <Button 
                        onClick={handleClearFilters}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          border: 'none'
                        }}
                        className="w-full transition-all duration-200 rounded-xl hover:scale-105 shadow-lg"
                      >
                        सभी साफ़ करें / Clear All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {filteredPosts.length === 0 ? (
              <Card className="text-center py-20 bg-gradient-to-br from-orange-50 to-green-50 border-2 border-dashed border-orange-300">
                <CardContent>
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-3xl font-bold text-gray-700 mb-4">कोई लेख नहीं मिला / No articles found</h3>
                  <p className="text-gray-600 mb-8 text-lg">अपने खोज शब्दों को समायोजित करने का प्रयास करें / Try adjusting your search terms</p>
                  <Button 
                    onClick={handleClearFilters}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      border: 'none'
                    }}
                    className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl hover:scale-105"
                  >
                    सभी फिल्टर साफ़ करें / Clear All Filters
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
