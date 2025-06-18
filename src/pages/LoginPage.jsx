import  { useState } from "react";
import { useAuth } from '../auth/useAuth';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {login,register}=useAuth()
  const navigate = useNavigate()


  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError('');
     setLoading(true)

    try {
     let result;
     if(isSignup){
      result = await register(email,password,name);
     }else{
      result = await login(email,password)
     }

     if(result.success){
      navigate('/')
     }else{
      setError(result.error || 'Authentication failed');
     }
      
    } catch (error) {
        setError('Something went wrong. Please try again.',error)
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/6b2842d1-2339-4f08-84f6-148e9fcbe01b/IN-en-20231218-popsignuptwoweeks-perspective_alpha_website_large.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10">
        <div className="px-4 py-6 md:px-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="Netflix Logo"
            className="h-10 md:h-12"
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-black opacity-80 rounded-lg p-8 md:p-12">
            <h1 className="text-white text-3xl font-semibold mb-8">
              {isSignup ? "Sign Up" : "Sign In"}
            </h1>

            {error && (
              <div className="bg-red-600 text-white p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignup && (
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-4 bg-netflix-gray text-white rounded border-none outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                    required={isSignup}
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  placeholder="Email or mobile number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-netflix-gray text-white rounded border-none outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-netflix-gray text-white rounded border-none outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-netflix text-white py-4 rounded font-semibold hover:bg-red-700 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : (isSignup ? 'Sign Up' : 'Sign In')}
              </button>

              {!isSignup && (
                <>
                  <div className="text-center">
                    <a href="#" className="text-white hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="remember" className="text-white text-sm">
                      Remember me
                    </label>
                  </div>
                </>
              )}

              <div className="text-gray-400 text-sm">
                {isSignup ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignup(false)}
                      className=" text-white font-bold text-md hover:underline"
                    >
                      Sign in now.
                    </button>
                  </>
                ) : (
                  <>
                    New to Netflix?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignup(true)}
                      className="text-white font-bold text-md hover:underline cursor-pointer"
                    >
                      Sign up now.
                    </button>
                  </>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
