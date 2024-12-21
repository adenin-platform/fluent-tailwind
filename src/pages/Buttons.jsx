import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Settings, 
  Download, 
  Trash2, 
  ShoppingCart, 
  Loader2 
} from 'lucide-react';

const Buttons = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Buttons</h2>
      
      {/* Primary Buttons */}
      <div className="space-x-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      {/* Buttons with Icons */}
      <div className="space-x-2 mt-4">
        <Button>
          <Mail className="mr-2 h-4 w-4" /> Send Email
        </Button>
        <Button variant="secondary">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>

      {/* Disabled and Loading States */}
      <div className="space-x-2 mt-4">
        <Button disabled>Disabled</Button>
        <Button disabled variant="secondary">Disabled Secondary</Button>
        <Button>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
        </Button>
      </div>

      {/* Size Variations */}
      <div className="space-x-2 mt-4">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* Destructive and Utility Buttons */}
      <div className="space-x-2 mt-4">
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
