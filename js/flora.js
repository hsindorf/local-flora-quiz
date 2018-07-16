function Flora(id, name, scientificName, familyName, image) {
  this.id = id;
  this.name = name;
  this.scientificName = scientificName;
  this.familyName = familyName;
  this.image = image;
  Flora.all.push(this);
}

Flora.all = [];

function makeAllFlora() {
  new Flora(
    0,
    'Pacific Rhododendron',
    'Rhododendron macrophyllum',
    'Ericaceae',
    'images/0.jpg'
  )

  new Flora(
    1,
    'Western Redcedar',
    'Thuja plicata',
    'Cupressaceae',
    'images/1.jpg'
  );

  new Flora(
    2,
    'Salal',
    'Gaultheria shallon',
    'Ericaceae',
    'images/2.jpg'
  )

  new Flora(
    3,
    'Oregon Grape',
    'Mahonia aquifolium',
    'Berberidaceae',
    'images/3.jpg'
  )

  new Flora(
    4,
    'Sword Fern',
    'Polystichum munitum',
    'Dryopteridaceae',
    'images/4.jpg'
  )

  new Flora(
    5,
    'Vine Maple',
    'Acer circinatum',
    'Aceraceae',
    'images/5.jpg'
  )

  new Flora(
    6,
    'Horsetail',
    'Equisetum arvense',
    'Equisetaceae',
    'images/6.jpg'
  )

  new Flora(
    7,
    'American Holly',
    // internet suggests that this might have a different scientific name
    'Ilex americana',
    'Aquifoliaceae',
    'images/7.jpg'
  )

  new Flora(
    8,
    'Nootka Rose',
    'Rosa nutkana',
    'Rosaceae',
    'images/8.jpg'
  )
  
  new Flora(
    9,
    'Indian Plum',
    'Oemleria cerasiformis',
    'Rosaceae',
    'images/9.jpg'
  )
}

makeAllFlora();