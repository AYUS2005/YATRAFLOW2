import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, BarChart3, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from 'sonner';

export default function Landing() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (authMode === 'signup' && !name) {
      toast.error('Please enter your name');
      return;
    }

    try {
      const success = authMode === 'login' 
        ? await login(email, password, role)
        : await signup(email, password, name, role);

      if (success) {
        toast.success(`${authMode === 'login' ? 'Logged in' : 'Account created'} successfully!`);
        setShowAuthDialog(false);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">YatraFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button onClick={() => { setAuthMode('login'); setShowAuthDialog(true); }}>
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Road Safety Management Made Simple
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real-time accident and hazard reporting with comprehensive analytics. Keep roads safer for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => { setAuthMode('signup'); setShowAuthDialog(true); }}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8"
                onClick={() => { setAuthMode('login'); setShowAuthDialog(true); }}
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to manage road safety effectively</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<AlertTriangle className="h-10 w-10 text-warning" />}
              title="Real-Time Reporting"
              description="Instantly report accidents and hazards with detailed information including location, severity, and status updates."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-primary" />}
              title="Live Analytics"
              description="Dynamic charts and graphs update in real-time. Track trends, severity patterns, and zone-wise distributions."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-accent" />}
              title="Role-Based Access"
              description="Admin and user roles with different permissions. Admins get full CRUD capabilities for complete control."
            />
            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-success" />}
              title="Status Management"
              description="Track report lifecycle from active to pending to resolved. Complete status history for every report."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Advanced Filtering"
              description="Multi-criteria search and filter by zone, type, severity, status, or date. Find what you need instantly."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-chart-2" />}
              title="Export & Reports"
              description="Export data to CSV for external analysis. Generate comprehensive reports with a single click."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
<section className="py-20 bg-background/50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">About YatraFlow</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Learn how YatraFlow revolutionizes road safety management with real-time monitoring, intelligent insights, and seamless reporting.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-card/70 border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <AlertTriangle className="h-10 w-10 text-warning mb-4" />
        <h3 className="text-xl font-semibold mb-2">Real-Time Alerts</h3>
        <p className="text-muted-foreground">
          Instantly get notified about accidents and hazards in your city. Real-time updates help authorities respond faster.
        </p>
      </div>

      <div className="bg-card/70 border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <BarChart3 className="h-10 w-10 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
        <p className="text-muted-foreground">
          Turn raw incident data into actionable intelligence. Analyze trends, severity patterns, and zone-wise statistics efficiently.
        </p>
      </div>

      <div className="bg-card/70 border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <Users className="h-10 w-10 text-accent mb-4" />
        <h3 className="text-xl font-semibold mb-2">Empowered Teams</h3>
        <p className="text-muted-foreground">
          Equip traffic management teams, emergency responders, and city officials with tools to reduce response times and improve road safety.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
<footer className="border-t bg-card/50 py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-8">
      {/* Branding + Socials */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">YatraFlow</span>
        </div>
        <p className="text-muted-foreground mb-4">
          Making roads safer through intelligent monitoring and real-time analytics.
        </p>
        <div className="flex gap-4">
          {/* Twitter */}
          <a
            href="https://twitter.com/AyushSingh98398"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.5 0c-2.5 0-4.5 2-4.5 4.5 0 .35.04.7.1 1.03A12.94 12.94 0 013 1.36a4.51 4.51 0 001.4 6.03A4.48 4.48 0 012.8 6v.05c0 2.2 1.57 4.03 3.64 4.44a4.52 4.52 0 01-2.04.08c.57 1.78 2.23 3.08 4.19 3.12A9.06 9.06 0 010 19.54 12.84 12.84 0 007 21c8.4 0 13-7 13-13 0-.2 0-.42-.01-.63A9.18 9.18 0 0023 3z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ayush-singh-7b4b0a248/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48c0 1.63 1.34 2.97 2.98 2.97 1.63 0 2.98-1.34 2.98-2.97C7.96 4.84 6.61 3.5 4.98 3.5zM2.4 21h5.16V9H2.4v12zm7.4-12v12h5.16v-6.36c0-3.46 4.48-3.74 4.48 0V21H24v-7.2c0-6.78-7.36-6.54-8.88-3.18V9h-5.16z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/AYUS2005"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.16c-3.34.73-4.03-1.42-4.03-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.56.12-3.26 0 0 1-.32 3.3 1.23a11.53 11.53 0 013-.41c1.02.01 2.05.14 3 .41 2.3-1.55 3.3-1.23 3.3-1.23.66 1.7.24 2.95.12 3.26.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.61-5.47 5.91.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-semibold mb-4">Contact</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>Email: ayushhomz.com</li>
          <li>Phone: +91 123 456 7890</li>
          <li>Emergency: 112</li>
        </ul>
      </div>
    </div>

    <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
      <p>&copy; 2025 YatraFlow. All rights reserved.</p>
    </div>
  </div>
</footer>


      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</DialogTitle>
            <DialogDescription>
              {authMode === 'login' 
                ? 'Login to access your dashboard' 
                : 'Sign up to start managing road safety'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup value={role} onValueChange={(v) => setRole(v as 'admin' | 'user')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="font-normal">User (View & Report)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="font-normal">Admin (Full Access)</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              >
                {authMode === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);
