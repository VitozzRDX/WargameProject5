
let hexFunctions = {

    Orientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
        return { f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, start_angle: start_angle };
    },
    layout_flat() {
        return this.Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
    },
    Point(x, y) {
        return { x: x, y: y };
    },
    Layout(orientation, size, origin) {
        return { orientation: orientation, size: size, origin: origin };
    },
    Hex(q, r, s) {
        if (Math.round(q + r + s) !== 0) throw "q + r + s must be 0";
        return { q: q, r: r, s: s };
    },
    polygon_corners(layout, h) {
        var corners = [];
        var center = this.hex_to_pixel(layout, h);
    
        for (var i = 0; i < 6; i++) {
            var offset = this.hex_corner_offset(layout, i);
            corners.push(this.Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    },
    hex_to_pixel(layout, h) {
        var M = layout.orientation;
        var size = layout.size;
        var origin = layout.origin;
        var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
        var y = (M.f2 * h.q + M.f3 * h.r) * size.y;
        return this.Point(x + origin.x, y + origin.y);
    },

    hex_corner_offset(layout, corner) {
        var M = layout.orientation;
        var size = layout.size;
        var angle = 2.0 * Math.PI * (M.start_angle - corner) / 6;
        return this.Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    },

    pixel_to_hex(layout, p) {

        var M = layout.orientation;
        var size = layout.size;
        var origin = layout.origin;
    
    
        var pt = this.Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        var q = M.b0 * pt.x + M.b1 * pt.y;
        var r = M.b2 * pt.x + M.b3 * pt.y;
    
        return this.Hex(q, r, -q - r);
    },
    hex_round(h) {
        var qi = Math.round(h.q);
        var ri = Math.round(h.r);
        var si = Math.round(h.s);
        var q_diff = Math.abs(qi - h.q);
        var r_diff = Math.abs(ri - h.r);
        var s_diff = Math.abs(si - h.s);
        if (q_diff > r_diff && q_diff > s_diff) {
            qi = -ri - si;
        }
        else
            if (r_diff > s_diff) {
                ri = -qi - si;
            }
            else {
                si = -qi - ri;
            }
    
        return this.Hex(qi, ri, si);
    }

}

export {hexFunctions}
