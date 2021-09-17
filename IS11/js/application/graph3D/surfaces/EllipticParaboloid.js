Surface.prototype.EllipticParaboloid = (count = 20, p = 2, q = 2) => {
    const points = [];
    const edges = [];
    const polygones = [];
    

    const PI2 = Math.PI * 2;
    const da = PI2 / count;

    //add points
    for(let z = -count; z <= count; z++){
        const r = Math.sqrt(z)
        for(let a = 0; a < PI2; a += da){
            points.push(new Point(
                r * Math.cos(a),
                r * Math.sin(a),
                z
            ));
        }
    }
    //add edges
    for(let i = 0; i < points.length; i++){
        if(points[i + 1] && (i + 1) % count !== 0){
            edges.push(new Edge(i, i + 1));
    } else {
        edges.push(new Edge(i, i + 1 - count));
    }
    if(points[i + count]){
        edges.push(new Edge(i, i + count));
        }
    }
    //add polygones
    for(let i = 0; i < points.length; i++){
        if(points[i + 1 + count] && (i + 1) % count !== 0){
            polygones.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count

            ]));
        } else {
            if ((i+1) % count === 0 ) {
                if(points[i + count]) {
                    polygones.push(
                        new Polygon([
                            i,
                            i + 1 - count,
                            i + 1,
                            i + count
                        ])
                    );
                }
            }
        }
    }
	 // раскрасить полигоны сеткой
    for (let i = 0; i < polygones.length; ++i) {
        const a = Math.floor(i / count);
        if (i % 2 == 0) {
            polygones[i].color = {r: 255, g: 255, b: 255};
        }
        else {
            polygones[i].color = {r: 0, g: 0, b: 0};
        }
    }
    return new Subject(points, edges, polygones);
}