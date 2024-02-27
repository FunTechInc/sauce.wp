# sauce.wp 
![sauce.wp](/thumb.jpg) 
sauce.wp is a template for build a website with WordPress.  
Documentation is constructing now.  

## Getting Started
  
### Start development server
1. Install Node.js `npm install`
2. Start docker by wp-env `npm run wp-update`  
3. Start development server `npm run start`
4. Open `http://localhost:8888` in your browser.  

### Export files for production
1. Build for production `npm run build`  
2. `dist` directory is created.  
3. Upload `dist` directory to your server.  

### Stop docker
1. Stop docker `npm run wp-stop`