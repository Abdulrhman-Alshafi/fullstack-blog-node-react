// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Components
import AdminRouteGuard from "./components/admin/AdminRouteGuard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/Dashboard";
import BlogsManagement from "./components/admin/BlogsManagement";
import CategoriesManagement from "./components/admin/CategoriesManagement";
import TagsManagement from "./components/admin/TagsManagement";
import UsersManagement from "./components/admin/UsersManagement";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <AdminRouteGuard>
              <AdminLayout />
            </AdminRouteGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="blogs" element={<BlogsManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="tags" element={<TagsManagement />} />
          <Route path="users" element={<UsersManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
