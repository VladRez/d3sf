# D3 SF

Check out the [Live Site][1]


Purpose:

Combining data from different sources to create a visualization. My plan was to make a d3 map similar to [this][9]. 

MVP

+ Display a Map
+ Overlay data points on map
+ Animatie data points over a time period.
+ Add numerical details. 


Challenges

1. Recognizing the technical and syntatical differences of d3 version as many examples in the wild switch between v3 and v4.  
2. [Displaying Geographic Data with D3][8] requires understanding of the standard in representing geographical features with [GeoJSON][10].   
3. Understanding [Shapes][11] files, the geospatial vector data format for GIS and requirements for [converting][3] them into usable GeoJSON
4. Setting up d3 *projection* so the map will correctly represent lat/lng in pixels
5. Overlaying different representations of the same map.
6. Taking a large dataset and accurately plotting them on the map.


Future Plans:

Create a Pivot Table like interfacte to give users the ability to slice and visualize data better. 

Sources:

+ [San Francisco City Shape Files][2]
+ [GeoJson Converter][3]
+ [SFPD by District GeoJson][4]
+ [pivot/rollup in d3][5]
+ [SFPD Historical Incident Report][6]
+ [choropleth coloring][7]
+ [Displaying Geographic Data with D3][8]

[1]: http://d3sf.herokuapp.com
[2]: https://www.census.gov/cgi-bin/geo/shapefiles/index.php?year=2018&layergroup=All+Lines
[3]: https://www.statsilk.com/maps/convert-esri-shapefile-map-geojson-format
[4]: https://data.sfgov.org/Public-Safety/Historical-Police-Districts/embj-38bg
[5]: http://learnjsdata.com/group_data.html
[6]: https://www.kaggle.com/san-francisco/sf-police-calls-for-service-and-incidents/version/61
[7]: http://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=9
[8]: https://www.d3indepth.com/geographic/
[9]: https://www.theguardian.com/environment/interactive/2013/may/14/alaska-villages-frontline-global-warming
[10]: https://en.wikipedia.org/wiki/GeoJSON
[11]: https://en.wikipedia.org/wiki/Shapefile