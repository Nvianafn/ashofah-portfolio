PROJECT SCREENSHOTS (with carousel)
===================================

Each project opens a detail modal when clicked. On the right side there is an
auto-sliding carousel. Drop your screenshots in THIS folder (public/projects/)
using these exact file names and they show up automatically:

  yasu-project-1.png    yasu-project-2.png    yasu-project-3.png
  genbi-purwokerto-1.png    genbi-purwokerto-2.png    genbi-purwokerto-3.png
  kkn97-semali-1.png    kkn97-semali-2.png    kkn97-semali-3.png
  rowokele112-1.png    rowokele112-2.png    rowokele112-3.png
  pmii-saintek-1.png    pmii-saintek-2.png    pmii-saintek-3.png
  simpus-1.png    simpus-2.png    simpus-3.png

The FIRST image (-1) is also used as the thumbnail on the project card.

Want more or fewer slides?
- Open content/projects.json and edit the "images" array for that project.
- Add as many paths as you like, or remove the ones you do not need.
- The carousel only autoplays when there are 2+ images.

Tips:
- Recommended size: 1200 x 750 px (ratio 16:10).
- PNG or JPG both work. If you use .jpg, update the path in projects.json
  (e.g. /projects/yasu-project-1.jpg).
- Images are cropped from the TOP, so keep the important part up top.
- No screenshot yet? The slide shows a clean placeholder, nothing looks broken.
