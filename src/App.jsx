import { Route, Routes } from "react-router-dom";
import Register from './Register'
import Login from './Login'
import RequireAuth from "./components/RequireAuth";
import {
  Home,
  Editor,
  Layout,
  Missing,
  Unauthorized,
  LinkPage,
  Lounge,
  Admin,
} from "./components/index";

const ROLES  = {
  Admin: import.meta.env.VITE_ADMIN_ROLE,
  User: import.meta.env.VITE_USER_ROLE,
  Editor: import.meta.env.VITE_EDITOR_ROLE
}

function App() {

  return (
    <>
      <main className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            {/* private routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
              {console.log(ROLES.User)}
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[import.meta.env.VITE_EDITOR_ROLE]}/>}>
               <Route path="editor" element={<Editor />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[import.meta.env.VITE_ADMIN_ROLE]}/>}>
               <Route path="admin" element={<Admin />} />
            </Route>
            <Route element= {<RequireAuth allowedRoles={[import.meta.env.VITE_ADMIN_ROLE, import.meta.env.VITE_EDITOR_ROLE]}/>}>
            <Route path="lounge" element={<Lounge />} />
            </Route>
              
            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
