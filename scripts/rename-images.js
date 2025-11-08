const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Location name mapping - convert slug to display name format
function getLocationDisplayName(slug) {
  const nameMap = {
    'center-city-philadelphia-pa': 'Center-City-Philadelphia-PA',
    'university-city-philadelphia-pa': 'University-City-Philadelphia-PA',
    'fishtown-philadelphia-pa': 'Fishtown-Philadelphia-PA',
    'manayunk-philadelphia-pa': 'Manayunk-Philadelphia-PA',
    'old-city-philadelphia-pa': 'Old-City-Philadelphia-PA',
    'society-hill-philadelphia-pa': 'Society-Hill-Philadelphia-PA',
    'bala-cynwyd-pa': 'Bala-Cynwyd-PA',
    'king-of-prussia-pa': 'King-of-Prussia-PA',
    'conshohocken-pa': 'Conshohocken-PA',
    'fort-washington-pa': 'Fort-Washington-PA',
    'wynnewood-pa': 'Wynnewood-PA',
    'ardmore-pa': 'Ardmore-PA',
    'narberth-pa': 'Narberth-PA',
    'haverford-pa': 'Haverford-PA',
    'bryn-mawr-pa': 'Bryn-Mawr-PA',
    'wayne-pa': 'Wayne-PA',
    'radnor-pa': 'Radnor-PA',
    'media-pa': 'Media-PA',
    'west-chester-pa': 'West-Chester-PA',
    'doylestown-pa': 'Doylestown-PA',
    'newtown-pa': 'Newtown-PA',
    'langhorne-pa': 'Langhorne-PA',
    'remote': 'Nationwide-Remote',
    'wilmington-de': 'Wilmington-DE',
    'trenton-nj': 'Trenton-NJ',
  };
  return nameMap[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
}

// Property type name mapping
function getPropertyTypeDisplayName(slug) {
  const nameMap = {
    'multifamily-communities': 'Multifamily-Communities',
    'triple-net-retail': 'Triple-Net-Retail',
    'industrial-flex-buildings': 'Industrial-Flex-Buildings',
    'medical-office': 'Medical-Office',
    'hospitality-assets': 'Hospitality-Assets',
    'land-for-development': 'Land-for-Development',
    'self-storage-facilities': 'Self-Storage-Facilities',
    'office-buildings': 'Office-Buildings',
    'mixed-use-properties': 'Mixed-Use-Properties',
    'student-housing': 'Student-Housing',
  };
  return nameMap[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
}

// Process location images
function processLocationImages() {
  const locationsDir = path.join(publicDir, 'locations');
  const subdirs = fs.readdirSync(locationsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  subdirs.forEach(slug => {
    const subdirPath = path.join(locationsDir, slug);
    const files = fs.readdirSync(subdirPath)
      .filter(file => /\.(webp|avif|jpg|jpeg|png)$/i.test(file));

    if (files.length === 0) return;

    // Use first image found
    const sourceFile = files[0];
    const ext = path.extname(sourceFile);
    const displayName = getLocationDisplayName(slug);
    const newFileName = `1031-exchange-${displayName}${ext}`;
    const sourcePath = path.join(subdirPath, sourceFile);
    const destPath = path.join(locationsDir, newFileName);

    console.log(`Moving ${sourcePath} -> ${destPath}`);
    fs.renameSync(sourcePath, destPath);
  });
}

// Process property type images
function processPropertyTypeImages() {
  const propertyTypesDir = path.join(publicDir, 'property-types');
  const subdirs = fs.readdirSync(propertyTypesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  subdirs.forEach(slug => {
    const subdirPath = path.join(propertyTypesDir, slug);
    const files = fs.readdirSync(subdirPath)
      .filter(file => /\.(webp|avif|jpg|jpeg|png)$/i.test(file));

    if (files.length === 0) return;

    // Use first image found
    const sourceFile = files[0];
    const ext = path.extname(sourceFile);
    const displayName = getPropertyTypeDisplayName(slug);
    const newFileName = `1031-exchange-${displayName}${ext}`;
    const sourcePath = path.join(subdirPath, sourceFile);
    const destPath = path.join(propertyTypesDir, newFileName);

    console.log(`Moving ${sourcePath} -> ${destPath}`);
    fs.renameSync(sourcePath, destPath);
  });
}

// Delete empty subfolders
function deleteEmptyFolders() {
  [path.join(publicDir, 'locations'), path.join(publicDir, 'property-types')].forEach(baseDir => {
    const subdirs = fs.readdirSync(baseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    subdirs.forEach(slug => {
      const subdirPath = path.join(baseDir, slug);
      const files = fs.readdirSync(subdirPath);
      // Only delete if empty or only contains .txt files
      if (files.length === 0 || files.every(f => f.endsWith('.txt'))) {
        console.log(`Deleting empty folder: ${subdirPath}`);
        fs.rmSync(subdirPath, { recursive: true, force: true });
      }
    });
  });
}

// Run the script
console.log('Processing location images...');
processLocationImages();
console.log('\nProcessing property type images...');
processPropertyTypeImages();
console.log('\nDeleting empty folders...');
deleteEmptyFolders();
console.log('\nDone!');

