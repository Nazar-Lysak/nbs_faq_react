import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const reactRoots = new WeakMap();

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.reactFaq = {
    attach: function (context, settings) {
      const containers = once('react-faq-init', '[data-react-faq]', context);
      
      containers.forEach((container) => {
        try {
          const faqDataAttr = container.getAttribute('data-react-faq');
          
          if (!faqDataAttr) {
            console.warn('React FAQ: Missing data-react-faq attribute');
            return;
          }
          
          const faqData = JSON.parse(faqDataAttr);
          
          const root = createRoot(container);
          root.render(<App data={faqData} />);
          
          reactRoots.set(container, root);
        } catch (error) {
          console.error('React FAQ: Failed to initialize component', {
            element: container,
            error: error.message
          });
        }
      });
    },    
    
    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        const containers = once.filter('react-faq-init', '[data-react-faq]', context);
        
        containers.forEach((container) => {
          const root = reactRoots.get(container);
          if (root) {
            try {
              root.unmount();
              reactRoots.delete(container);
            } catch (error) {
              console.error('React FAQ: Failed to unmount component', error);
            }
          }
        });
      }
    }
  };
})(Drupal, once);