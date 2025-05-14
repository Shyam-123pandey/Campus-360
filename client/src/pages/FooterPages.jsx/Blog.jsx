import './Pages.css';

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of Online Learning in 2024",
      date: "March 15, 2024",
      author: "Shyam Pandey",
      excerpt: "Explore how AI, VR, and personalized learning are transforming the educational landscape...",
      category: "Education Technology"
    },
    {
      title: "5 Essential Skills for Modern Developers",
      date: "March 12, 2024",
      author: "Ayush",
      excerpt: "From cloud computing to AI integration, discover the must-have skills for today's developers...",
      category: "Career Development"
    },
    {
      title: "Mastering Data Structures: A Complete Guide",
      date: "March 10, 2024",
      author: "Dr. Alex Kumar",
      excerpt: "A comprehensive guide to understanding and implementing data structures effectively...",
      category: "Programming"
    },
    {
      title: "How to Stay Motivated During Online Learning",
      date: "March 8, 2024",
      author: "Rhythm",
      excerpt: "Practical tips and strategies to maintain motivation and achieve your learning goals...",
      category: "Student Success"
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Blog</h1>
      <p className="page-subtitle">Insights and articles about technology, learning, and career development</p>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <article key={index} className="blog-card">
            <div className="blog-category">{post.category}</div>
            <h2 className="blog-title">{post.title}</h2>
            <p className="blog-meta">
              By {post.author} | {post.date}
            </p>
            <p className="blog-excerpt">{post.excerpt}</p>
            <button className="read-more-btn">Read More</button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog; 