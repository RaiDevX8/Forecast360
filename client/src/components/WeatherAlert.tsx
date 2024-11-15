import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; 
const WeatherNews = () => {
  const [news, setNews] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6); 

  const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchWeatherNews = async () => {
      const url = `https://newsapi.org/v2/everything?q=weather&apiKey=${newsApiKey}`;
console.log(newsApiKey)
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
          setNews(data.articles);
        } else {
          setError('No weather news found.');
        }
      } catch (error) {
        setError('Failed to fetch weather news.');
      }
    };

    fetchWeatherNews();
  }, [newsApiKey]);

  const loadMoreNews = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-2xl font-bold mb-4">Weather News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 rounded-full gap-6">
        {news.slice(0, visibleCount).map((article, index) => (
          <Card key={index} className="border rounded-lg shadow-md">
            {/* Card Header */}
            <CardHeader className=" rounded  p-4">
              <CardTitle className="text-lg font-semibold">{article.source.name}</CardTitle>
            </CardHeader>
            {/* Card Content */}
            <CardContent className="p-6">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <h4 className="text-xl font-semibold">{article.title}</h4>
              </a>
              <p className="text-sm text-muted-foreground mt-2">{article.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* "Load More" Button */}
      {visibleCount < news.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreNews}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherNews;