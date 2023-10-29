import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// desktop version
import Header from './Header';
import LandingPage from "./Desktop/Pages/LandingPage/LandingPage";
import MainPage from "./Desktop/Pages/MainPage/MainPage";
import EditorPage from "./Desktop/Pages/EditorPage/EditorPage";
import LoginPage from "./Desktop/Pages/LoginPage/LoginPage";
import RegisterPage from "./Desktop/Pages/RegisterPage/RegisterPage";

// mobile version


function App() {
	return (
		<>
			{/* pc version */}
			<BrowserView><BrowserRouter>

				<Header />
				<Routes>
					<Route path="*"    element={<LandingPage />} />
					<Route path="week" element={<MainPage />} />
					<Route path="editor" element={<EditorPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
				</Routes>

			</BrowserRouter></BrowserView>


			{/* mobile version * / }
			<MobileView><BrowserRouter>

				<MobileHeader />
				<Routes>
					<Route path="*"         element={<MobileMainPage />} />
					<Route path="dashboard" element={<MobileDashboardPage />} />
				</Routes>

			</BrowserRouter></MobileView> 
      {/* coment for coment mobile version faster */}

			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored" />
		</>
	);
}

export default App;