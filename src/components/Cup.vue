<template>

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="210"
   height="200"
   viewBox="0 0 112.44792 105.83334"
   version="1.1"
   id="svg8"
   inkscape:version="0.92.4 (5da689c313, 2019-01-14)"
   sodipodi:docname="cup.svg">
  <defs id="defs2">
    <linearGradient id="coffee-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" class="cup-filled" />
      <stop v-bind:offset="fillLevel" class="cup-filled"  />
      <stop v-bind:offset="fillLevel" class="cup-empty" />
      <stop offset="100%" class="cup-empty" />
    </linearGradient>
  </defs>
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="1"
     inkscape:cx="342.07179"
     inkscape:cy="302.73437"
     inkscape:document-units="px"
     inkscape:current-layer="layer1"
     showgrid="false"
     inkscape:window-width="1920"
     inkscape:window-height="1017"
     inkscape:window-x="-8"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     units="px" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(0,-191.16666)">
    <path
        class="cup"
       style="stroke-width:0.1"
       d="m 26.91823,192.71637 h 59.00358 c 1.867884,0 3.431534,1.42961 3.371633,3.20335 l -3.245195,96.10046 c -0.05989,1.77373 -1.503749,3.20334 -3.371634,3.20334 H 30.163426 c -1.867884,0 -3.311736,-1.42961 -3.371634,-3.20334 l -3.245196,-96.10046 c -0.0599,-1.77374 1.503748,-3.20335 3.371634,-3.20335 z"
       id="cup"
       inkscape:connector-curvature="0"
       sodipodi:nodetypes="sssssssss" />
    <path
        class="cup-handle"
       style="fill:none;stroke-width:4.92612696;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       d="m 87.81835,212.33688 c 7.43885,-0.98912 10.776945,-1.45624 18.41471,-1.45776 2.66368,0.57609 3.60905,3.5631 3.27094,5.85874 -3.30081,16.95262 -5.96722,33.44164 -8.03081,35.99496 -1.853351,2.68843 -9.700074,6.83098 -16.394302,8.25488"
       id="handle"
       inkscape:connector-curvature="0"
       sodipodi:nodetypes="ccccc" />
    <path
       class="cup-fill"
       style="stroke:none;stroke-width:5.79775047;stroke-miterlimit:4;stroke-dasharray:none"
       d="M 26.803439,192.79444 H 86.0366 c -1.307081,-0.0247 -1.406078,1.55855 -1.475093,3.49201 l -3.245196,90.92031 c -0.06901,1.93347 -0.921046,3.49202 -2.065121,3.49202 H 33.58885 c -1.144078,0 -1.996114,-1.55855 -2.065124,-3.49202 l -3.245197,-90.92031 c -0.116097,-3.25283 -1.119076,-3.57008 -1.47509,-3.49201 z"
       id="content"
       inkscape:connector-curvature="0"
       sodipodi:nodetypes="ccssssssc" />
  </g>
</svg>

</template>

<script lang="ts">
import {Vue, Prop, Watch, Component} from 'vue-property-decorator';

const maxLevel = 90;

@Component
export default class Cup extends Vue {
    @Prop({ default: 0 })
  progress!: number;
    
    @Watch('progress')
    onProgressChanged() {
        window.requestAnimationFrame(this.animationStep);
    }

    private smoothProgress: number = 0;

    get fillLevel() :string  {
        return (this.smoothProgress * maxLevel).toString() + '%';
    }

    animationStep() {
        if(Math.abs(this.progress - this.smoothProgress) < .001)
             return; 
        
        this.smoothProgress = this.lerp(this.smoothProgress, this.progress, 0.05);

        window.requestAnimationFrame(this.animationStep);
    }

    lerp(from: number, to: number, step: number) {
        return (1 - step) * from + step * to;
    }
    
}
</script>

<style scoped>
.cup-fill {
    fill: #432;
    fill: url(#coffee-gradient)
}

.cup {
    fill: #444;
}

.cup-handle {
    stroke: #444;
}

.cup-empty {
    stop-color:#ddd
}

.cup-filled {
    stop-color: #765;
}
</style>