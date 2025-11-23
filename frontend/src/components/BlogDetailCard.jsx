const BlogDetailCard = ({ blog }) => {
  return (
    <article className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row align-middle ">
        {blog.image && (
          <div className="md:w-1/3 w-full">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-96 object-cover md:h-full"
            />
          </div>
        )}

        {/* Content Right */}
        <div className="p-8 md:w-2/3 w-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="text-gray-600 mb-6">
            By <strong>{blog.author.name}</strong> |{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </article>
  );
};
export default BlogDetailCard;
