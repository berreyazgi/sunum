(function () {
  'use strict';
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function init(canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = false, raf = 0, last = 0, epoch = 0, elapsed = 0, dead = false;
    let size = 1000, dpr = 1;
    function resize() {
      const rect = canvas.getBoundingClientRect();
      size = Math.max(1, Math.round(rect.width || 1000));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      if (!active || reduced.matches) draw(elapsed);
    }
    function project(u, v, t, extra = 0) {
      const wave = Math.sin(u * 3 + t * .25) * 4;
      const tube = 60 + Math.cos(u * 2 - t * .2) * 7 + extra;
      const rr = 286 + tube * Math.cos(v) + wave;
      let x = rr * Math.cos(u), y = rr * Math.sin(u), z = tube * Math.sin(v);
      const tilt = .54 + Math.sin(t * .075) * .11;
      const yt = y * Math.cos(tilt) - z * Math.sin(tilt);
      z = y * Math.sin(tilt) + z * Math.cos(tilt); y = yt;
      const yaw = -.2 + Math.cos(t * .065) * .09;
      const xt = x * Math.cos(yaw) + z * Math.sin(yaw);
      z = -x * Math.sin(yaw) + z * Math.cos(yaw); x = xt;
      const rz = -.40 + t * .024;
      const xx = x * Math.cos(rz) - y * Math.sin(rz);
      y = x * Math.sin(rz) + y * Math.cos(rz); x = xx;
      const p = 1080 / (1080 - z);
      return { x: 500 + x * p, y: 500 + y * p, z, p, u, v };
    }
    function color(u, z, a, time) {
      const mix = (Math.sin(u - time * .11) + 1) * .5;
      const front = clamp((z + 200) / 400, 0, 1);
      return 'rgba(' + Math.round(67 + mix * 105 + front * 12) + ',' + Math.round(224 + mix * 29) + ',' + Math.round(210 - mix * 113) + ',' + a + ')';
    }
    function draw(t) {
      ctx.setTransform(canvas.width / 1000, 0, 0, canvas.height / 1000, 0, 0);
      ctx.clearRect(0, 0, 1000, 1000);
      // A broad, quiet halo leaves the centre clear for the original emblem.
      let halo = ctx.createRadialGradient(500, 510, 160, 500, 510, 440);
      halo.addColorStop(0, 'rgba(13,114,87,0)');
      halo.addColorStop(.4, 'rgba(42,178,121,.035)');
      halo.addColorStop(.66, 'rgba(51,229,166,.065)');
      halo.addColorStop(1, 'rgba(34,178,119,0)');
      ctx.fillStyle = halo; ctx.fillRect(50, 50, 900, 900);
      ctx.globalCompositeOperation = 'lighter';
      // Fine braided filaments describe the volume without a wireframe grid.
      const segments = [];
      for (let strand = 0; strand < 20; strand++) {
        let prev = null;
        for (let j = 0; j <= 144; j++) {
          const u = j / 144 * TAU;
          const v = strand / 20 * TAU + u * 2 + t * .19;
          const p = project(u, v, t);
          if (prev) segments.push({a:prev,b:p,z:(prev.z+p.z)/2,strand});
          prev = p;
        }
      }
      segments.sort((a,b)=>a.z-b.z);
      for (const s of segments) {
        const near = clamp((s.z + 210) / 430, 0, 1);
        const bright = s.strand % 5 === 0;
        ctx.strokeStyle = color(s.b.u, s.z, (bright ? .27 : .105) + near * (bright ? .42 : .23), t);
        ctx.lineWidth = bright ? 1.05 + near * .7 : .65 + near * .4;
        ctx.beginPath();ctx.moveTo(s.a.x,s.a.y);ctx.lineTo(s.b.x,s.b.y);ctx.stroke();
      }
      // Flowing point field. Front-facing particles are larger and brighter.
      const points = [];
      for (let row=0;row<12;row++) for(let j=0;j<96;j++) {
        const u = j / 96 * TAU + t * (.022 + row * .0008);
        const v = row / 12 * TAU + u * 2 + t * .19;
        const p = project(u,v,t);p.row=row;p.j=j;points.push(p);
      }
      points.sort((a,b)=>a.z-b.z);
      for(const p of points) {
        const near=clamp((p.z+210)/430,0,1);
        const pulse=.72 + Math.sin(p.u*4-t*.8+p.row*.4)*.28;
        const key=(p.j+p.row*7)%31===0;
        const r=(key?2.15: .62+near*.86)*p.p;
        if(key) {
          const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*7);
          g.addColorStop(0,color(p.u,p.z,.25+near*.15,t));
          g.addColorStop(.28,color(p.u,p.z,.08,t));g.addColorStop(1,'rgba(82,232,188,0)');
          ctx.fillStyle=g;ctx.fillRect(p.x-r*7,p.y-r*7,r*14,r*14);
        }
        ctx.fillStyle=color(p.u,p.z,(.37+near*.62)*pulse,t);
        ctx.beginPath();ctx.arc(p.x,p.y,r,0,TAU);ctx.fill();
        if(key && near>.5){ctx.fillStyle='rgba(232,255,219,.86)';ctx.beginPath();ctx.arc(p.x,p.y,.8*p.p,0,TAU);ctx.fill();}
      }
      // Three restrained travelling accents run just outside the braided ring.
      for(let k=0;k<3;k++) {
        const base=t*.09+k*TAU/3;
        for(let j=0;j<30;j++) {
          const u=base-j*.006;
          const a=project(u,0,t,26),b=project(u-.006,0,t,26);
          ctx.strokeStyle=color(u,a.z,(1-j/30)*.37,t);ctx.lineWidth=1.2;
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
      }
      ctx.globalCompositeOperation='source-over';
    }
    function frame(now) {
      if(dead || !active || document.hidden || reduced.matches){raf=0;return;}
      if(!epoch)epoch=now-elapsed*1000;
      if(now-last>=32){elapsed=(now-epoch)/1000;draw(elapsed);last=now;}
      raf=requestAnimationFrame(frame);
    }
    function sync() {
      cancelAnimationFrame(raf);raf=0;epoch=0;
      if(active && !document.hidden && !reduced.matches)raf=requestAnimationFrame(frame);
      else draw(elapsed);
    }
    function visibility(){sync();}
    const observer = typeof ResizeObserver!=='undefined' ? new ResizeObserver(resize) : null;
    if(observer)observer.observe(canvas);else window.addEventListener('resize',resize);
    document.addEventListener('visibilitychange',visibility);
    if(reduced.addEventListener)reduced.addEventListener('change',sync);
    resize();draw(0);
    return {
      setActive(value){active=!!value;sync();},
      drawStill(){draw(0);},
      destroy(){dead=true;active=false;cancelAnimationFrame(raf);observer?.disconnect();window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);if(reduced.removeEventListener)reduced.removeEventListener('change',sync);}
    };
  }
  window.ClosingArt={init};
})();
