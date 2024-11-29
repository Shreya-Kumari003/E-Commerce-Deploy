import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShirtIcon,
  Footprints,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const dressSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-dress"
  >
    <path d="M16 2v3a5.14 5.14 0 0 1 .7 4.8l-.2.5a7.64 7.64 0 0 0 .4 6.3C17.7 17.9 19 20 19 20s-3.1 2-7 2-7-2-7-2 1.3-2.1 2.1-3.5a7.64 7.64 0 0 0 .4-6.2l-.2-.5A5.66 5.66 0 0 1 8 5V2" />
    <path d="M16 5c-1.8 0-3.3 1-4 2.5C11.3 6 9.8 5 8 5" />
  </svg>
);

const zara = () => (
  <svg
    viewBox="0 0 1078 591"
    width="150"
    height="100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1022.11 439.76L862.49 0.29L862.38 0H859.23L826.36 90.31L766.52 254.72L766.38 254.59C745.64 236.29 716.38 224.85 679.53 220.59L668.29 219.43L679.44 218C740.21 207.08 781.06 168.7 781.06 122.46C781.06 59.05 721.42 14.79 635.99 14.79H458.24V18H509.89V345.65L384.45 0.29L384.34 0H381.19L348.32 90.31L221.54 438.63L220.76 438.72C218.593 438.987 216.45 439.2 214.33 439.36C211.14 439.61 207.97 439.76 204.79 439.76H76.69L320.19 18L322 14.83H24.19V145.3H27.35C27.91 81.75 64.92 18 146.69 18H245.34L0 442.92H330.52V317.92H327.36C326.93 373.31 295.53 425.92 227.25 437.8L225.08 438.17L277.08 295.24H422.75L475.24 439.76H423.46V442.92H626.69V439.76H574.69V221.76H634.69C695.75 221.76 730.77 249.04 730.77 296.58V335.25C730.77 339.51 731.06 345.74 731.38 350.95V351.14L699.13 439.74H657V442.9H744.21V439.74H702.53L731.9 359.06C731.96 359.84 731.99 360.31 731.99 360.31L732.8 367.58L733.58 372.39C738.48 402.14 749.86 424.01 767.39 437.39L769.91 439.22C783.23 448.48 799.78 453.17 819.13 453.17C844.76 453.17 861.85 446.78 875.96 431.74L874.11 430C861.11 442 850.2 446.86 836.53 446.86C813.24 446.86 801.05 418.61 801.05 390.75V336.57C801.174 323.126 799.069 309.755 794.82 297L794.24 295.32V295.26H900.79L953.28 439.78H901.5V442.94H1077.37V439.78L1022.11 439.76ZM278.24 292.08L350 94.93L421.6 292.08H278.24ZM574.72 218.59V18H620.52C681.7 18 714 54.37 714 123.14C714 196.28 695.46 218.59 634.69 218.59H574.72ZM793 292.08L792.69 291.3C787.955 279.768 781.062 269.246 772.38 260.3L769.38 257.3L769.06 257L828 94.93L899.6 292.08H793Z"
      fill="black"
    ></path>
  </svg>
);

const nike = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="150"
    height="100"
    viewBox="0 0 700 700"
    version="1.1"
    fill="none"
  >
    <path
      d="m 382.44821,318.75801 -32.50664,8.63642 -90.19564,23.89129 c -31.85313,7.97438 -59.71608,18.59607 -86.56533,9.29761 -36.49672,-15.94875 -35.8427,-57.44381 -8.63368,-101.58593 -48.10636,40.17132 -134.671687,168.62714 -17.5943,181.5984 14.91269,1.98527 41.46759,-3.30936 70.31167,-15.58616 l 132.67728,-55.09458 261.6903,-108.27043 z"
      fill="black"
      stroke-width="8.53147793"
    />
  </svg>
);

const HnM = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="150"
    height="100"
    viewBox="10.63 8.863 708.662 467.493"
    enable-background="new 10.63 8.863 708.662 467.493"
    xml:space="preserve"
  >
    <g id="layer1" transform="translate(-4397.099,-577.1118)">
      <g id="g45263" transform="translate(10.62987,8.863696)">
        <path
          id="path45125"
          fill="#CC071E"
          d="M4895.119,591.292c25.74-12.642,38.496-10.983,38.783,1.831
           c0.344,16.646-2.117,38.782-3.891,54.799c-9.553,87.055-25.512,158.191-26.713,247.574
           c42.043-108.843,77.279-184.492,122.697-277.662c14.416-29.688,23.625-24.139,35.465-29.402
           c46.105-20.535,47.822-7.951,41.814,17.161c-22.365,93.01-79.625,385.858-88.375,430.951c-2.518,13.047-16.703,7.516-20.365,2.414
           c-16.416-22.709-34.949-23.064-32.891-38.165c10.297-75.181,47.363-263.808,57.031-308.254
           c-49.252,100.972-100.332,227.199-126.588,298.77c-5.549,15.198-15.674,14.083-21.965,2.963
           c-8.867-15.621-26.084-23.596-28.945-42.055c-8.98-58.688,10.297-170.552,12.984-241.322
           c-26.826,77.308-71.844,227.399-91.579,295.211c-8.122,28.058-35.236,23.481-28.029-3.866
           c29.973-113.803,94.555-315.078,122.469-387.438C4863.602,597.755,4880.818,598.327,4895.119,591.292"
        />
        <path
          id="path45127"
          fill="#CC071E"
          d="M4731.637,577.334c-8.694-2.116-33.92,11.498-49.422,14.186
           c-4.919,0.858-9.61,6.063-11.269,9.782c-24.826,57.03-47.077,111.394-66.354,160.919c-24.654,4.21-53.483,9.753-85.745,17
           c23.109-59.278,46.448-117.744,69.214-173.973c11.211-27.686-18.304-30.317-29.745-2.288
           c-14.873,36.438-42.73,104.708-73.562,184.281c-22.652,5.554-46.676,11.903-71.788,19.157
           c-18.248,5.268-18.991,10.13-11.097,21.073c4.347,6.093,13.328,5.479,17.446,9.821c10.64,11.252,17.104,24.711,36.151,26.748
           c-16.989,45.446-33.978,92.312-49.365,137.438c-9.667,28.326,17.847,34.12,28.43,4.146c17.046-48.318,35.007-97.22,53.483-145.978
           c15.387-3.576,52.625-11.596,87.003-19.055c-27.285,74.785-45.247,131.581-52.053,159.227c-1.258,5.319,0.858,8.271,2.002,10.439
           c9.209,13.402,17.961,13.951,29.802,30.522c3.204,4.519,13.958,6.956,17.618-4.17c25.283-76.37,51.31-148.026,75.563-212.264
           c10.067-2.202,28.2-6.578,39.297-23.138c19.734-29.391,25.397-23.43,30.146-32.365c5.949-11.217,2.001-21.748-19.048-19.146
           c0,0-7.951,0.566-22.652,2.242c23.338-60.09,43.759-111.057,58.46-149.896C4739.188,588.889,4739.817,579.279,4731.637,577.334"
        />
        <path
          id="path45129"
          fill="#CC071E"
          d="M4697.202,967.071c5.434,13.734,22.423,9.575,15.959-7.001
           c-6.579-16.887-22.938-67.722-27.229-84.099c-5.834-22.068,19.449-16.033,6.636-1.606c-10.982,12.406-18.305,17.377-38.611,40.967
           c-19.62,22.772-14.3,52.323,6.693,58.85c23.681,7.367,44.56-18.728,57.487-37.873c12.527-18.539,0.4-29.413-12.241-18.453
           c-8.123,7.047-17.504,17.869-27,23.704c-7.722,4.696-13.786-0.349-3.489-14.523c11.955-16.411,25.34-30.162,35.293-45.67
           c20.307-31.604-19.849-49.822-37.124-29.293c-9.267,10.943-6.921,21.686-4.404,30.906
           C4673.234,897.749,4688.335,944.895,4697.202,967.071"
        />
      </g>
    </g>
  </svg>
);

const puma = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="150"
    height="100"
    viewBox="0 0 4096 4096"
  >
    <g transform="matrix(1.3333333,0,0,-1.3333333,0,4096)">
      <g transform="matrix(23.292587,0,0,23.292587,-5581.0712,-909.10455)">
        <g>
          <g transform="translate(309.5195,130.4059)">
            <path
              d="m 0,0 c -0.331,-0.046 -0.652,-1.282 -1.299,-1.922 -0.472,-0.458 -1.052,-0.431 -1.373,-1.008 -0.121,-0.216 -0.073,-0.583 -0.204,-0.919 -0.277,-0.703 -1.192,-0.774 -1.197,-1.528 0,-0.83 0.769,-0.985 1.44,-1.567 0.536,-0.465 0.579,-0.793 1.207,-1.015 0.554,-0.189 1.363,0.412 2.083,0.195 0.598,-0.177 1.173,-0.299 1.304,-0.927 0.117,-0.56 0,-1.436 -0.735,-1.338 -0.248,0.034 -1.294,0.384 -2.594,0.243 -1.571,-0.168 -3.362,-0.676 -3.537,-2.428 -0.093,-0.976 1.114,-2.122 2.282,-1.895 0.808,0.155 0.423,1.107 0.866,1.569 0.574,0.591 3.835,-2.066 6.866,-2.066 1.28,0 2.229,0.324 3.178,1.324 0.083,0.061 0.204,0.221 0.336,0.238 0.121,-0.017 0.35,-0.141 0.418,-0.192 2.452,-1.963 4.297,-5.9 13.275,-5.946 1.255,-0.015 2.701,-0.611 3.888,-1.699 1.041,-0.948 1.659,-2.462 2.243,-3.99 0.91,-2.306 2.516,-4.53 4.964,-7.012 0.131,-0.141 2.145,-1.703 2.297,-1.815 0.023,-0.024 0.179,-0.365 0.116,-0.559 -0.044,-1.509 -0.268,-5.84 2.954,-6.02 0.793,-0.044 0.594,0.506 0.594,0.9 -0.01,0.745 -0.142,1.494 0.248,2.273 0.549,1.046 -1.139,1.552 -1.105,3.839 0.039,1.713 -1.397,1.421 -2.131,2.73 -0.414,0.754 -0.794,1.163 -0.759,2.073 0.16,5.2 -1.115,8.632 -1.742,9.462 -0.497,0.643 -0.915,0.876 -0.453,1.178 2.696,1.786 3.304,3.438 3.304,3.438 1.431,3.372 2.725,6.443 4.496,7.81 0.36,0.265 1.28,0.958 1.845,1.224 1.659,0.79 2.535,1.267 3.007,1.725 0.773,0.737 1.377,2.301 0.637,3.233 -0.905,1.163 -2.486,0.229 -3.173,-0.175 -4.953,-2.946 -5.683,-8.129 -7.4,-11.102 -1.358,-2.375 -3.582,-4.131 -5.587,-4.27 -1.489,-0.102 -3.095,0.185 -4.701,0.888 -3.907,1.708 -6.019,3.913 -6.525,4.307 -1.056,0.807 -9.163,8.778 -15.762,9.106 0,0 -0.807,1.638 -1.007,1.667 C 2.078,0.085 1.586,-0.959 1.226,-1.066 0.905,-1.18 0.335,0.054 0,0"
              fill="#231f20"
              fill-opacity="1"
              fill-rule="nonzero"
              stroke="none"
              id="path36"
              inkscape:connector-curvature="0"
            />
          </g>
          <g id="g38" transform="translate(280.5464,82.8105)">
            <path
              d="m 0,0 c -0.623,0.029 -1.144,0.526 -1.144,1.143 l 0.005,20.54 H -7.902 V -0.949 c 0,-1.109 0.895,-2.01 1.985,-2.01 H 5.917 c 1.115,0 2.01,0.901 2.01,2.01 V 21.683 H 1.153 V 1.143 C 1.153,0.526 0.618,0.029 0,0"
              fill="#231f20"
              fill-opacity="1"
              fill-rule="nonzero"
              stroke="none"
              id="path40"
              inkscape:connector-curvature="0"
            />
          </g>
          <g id="g42" transform="translate(303.1934,104.4938)">
            <path
              d="m 0,0 h -10.224 c -1.212,0 -2.194,-0.983 -2.194,-2.219 v -22.423 h 6.759 v 20.579 c 0.014,0.623 0.535,1.129 1.153,1.129 0.618,0 1.144,-0.487 1.153,-1.12 v -20.588 h 6.74 v 20.588 c 0.009,0.633 0.51,1.12 1.148,1.12 0.633,0 1.139,-0.506 1.153,-1.129 v -20.579 h 6.76 V -2.219 C 12.448,-0.983 11.475,0 10.258,0 Z"
              fill="#231f20"
              fill-opacity="1"
              fill-rule="nonzero"
              stroke="none"
              id="path44"
              inkscape:connector-curvature="0"
            />
          </g>
          <g id="g46" transform="translate(263.5933,100.3965)">
            <path
              d="m 0,0 c 0,0.676 -0.56,1.153 -1.158,1.153 h -1.149 v -12.467 h 1.149 c 0.603,0 1.158,0.477 1.158,1.173 z m 4.54,-14.355 h -6.847 v -6.19 H -9.066 V 4.097 H 4.579 c 1.231,0 2.17,-0.983 2.17,-2.219 v -14.019 c 0,-1.226 -0.988,-2.214 -2.209,-2.214"
              fill="#231f20"
              fill-opacity="1"
              fill-rule="nonzero"
              stroke="none"
              id="path48"
              inkscape:connector-curvature="0"
            />
          </g>
          <g id="g50" transform="translate(327.0083,89.0827)">
            <path
              d="m 0,0 v 11.348 c -0.024,0.628 -0.541,1.114 -1.159,1.114 -0.622,0 -1.129,-0.496 -1.157,-1.129 V 0 Z m 0,-9.231 v 6.185 h -2.302 v -6.185 h -6.764 v 22.423 c 0,1.236 0.983,2.219 2.205,2.219 H 4.554 c 1.222,0 2.21,-0.983 2.21,-2.219 V -9.231 Z"
              fill="#231f20"
              fill-opacity="1"
              fill-rule="nonzero"
              stroke="none"
              id="path52"
              inkscape:connector-curvature="0"
            />
          </g>
          <g id="g54" transform="translate(345.8203,84.1048)">
            <path
              d="m 0,0 c 0,-2.618 -2.087,-4.735 -4.667,-4.735 -2.618,0 -4.725,2.112 -4.725,4.735 0,2.564 2.107,4.701 4.633,4.701 C -2.087,4.701 0,2.632 0,0 m -4.725,4.005 c -2.112,0 -3.898,-1.825 -3.898,-4.024 0,-2.249 1.786,-4.044 3.956,-4.044 2.176,0 3.918,1.795 3.918,4.044 0,2.209 -1.742,4.024 -3.918,4.024 z"
              fill="#231f20"
              fill-opacity="1"
              fill-rule="nonzero"
              stroke="none"
              id="path56"
              inkscape:connector-curvature="0"
            />
          </g>
          <g id="g58" transform="translate(343.3437,81.3699)">
            <path
              d="M 0,0 H -1.246 L -2.861,2.131 V 0 h -1.037 v 5.416 h 1.105 c 1.445,0 2.229,-0.545 2.229,-1.591 0,-0.711 -0.463,-1.329 -1.105,-1.509 L -1.723,2.282 Z m -2.671,3.027 c 0.729,0 1.109,0.267 1.109,0.769 0,0.472 -0.38,0.71 -1.09,0.71 H -2.861 V 3.027 Z"
              fill="#231f20"
              fill-opacity="1"
              fill-rule="nonzero"
              stroke="none"
              id="path60"
              inkscape:connector-curvature="0"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const adidias = () => (
  <svg viewBox="100 100 700 700" width="150" height="100">
    <path
      d="M 707.70311,605.81202 520.92368,282.18798 420.87909,339.89454 574.31717,605.81202 Z m -177.968,0 -123.35986,-213.56366 -100.0446,57.70655 90.01852,155.85711 z M 292.33119,502.48373 351.94209,605.81202 H 218.55616 L 192.29689,560.1903 Z"
      id="path2"
      inkscape:connector-curvature="0"
      clip-rule="evenodd"
      fill="currentColor"
      fill-rule="evenodd"
      stroke-width="10.29371357"
      inkscape:export-xdpi="74.504333"
      inkscape:export-ydpi="74.504333"
    />
  </svg>
);

const levis = () => (
  <svg
    x="0px"
    y="0px"
    width="150"
    height="100"
    viewBox="0 0 4096.0002 4095.9999"
    xml:space="preserve"
  >
    <defs id="defs9" />
    <rect
      fill="#ffffff"
      fill-rule="evenodd"
      stroke-width="4.35868359"
      width="490.57098"
      height="345.14719"
      x="2979.3064"
      y="1410.5566"
    />
    <rect
      fill="#ffffff"
      fill-rule="evenodd"
      stroke-width="6.78946257"
      width="2387.0461"
      height="560.97858"
      x="895.6521"
      y="1666.0121"
    />
    <g transform="matrix(10.972589,0,0,10.972589,492.83302,1410.5602)">
      <path
        fill="#a8112e"
        d="m 250.094,7.094 c 0.71,-0.05 1.341,-0.196 1.896,-0.439 0.552,-0.24 0.997,-0.61 1.323,-1.117 0.331,-0.502 0.496,-1.206 0.496,-2.104 0,-0.759 -0.151,-1.366 -0.441,-1.819 -0.297,-0.449 -0.676,-0.795 -1.145,-1.04 -0.467,-0.239 -1.004,-0.407 -1.611,-0.489 -0.261,-0.04 -0.52,-0.065 -0.777,-0.086 h -5.688 v 7.17 h 3.688 c 0.797,0 1.549,-0.024 2.259,-0.076 z m -13.348,13.168 c 1.437,1.489 3.135,2.656 5.092,3.506 1.955,0.849 4.076,1.271 6.358,1.271 2.255,0 4.347,-0.423 6.287,-1.271 1.94,-0.85 3.628,-2.017 5.066,-3.506 1.435,-1.487 2.562,-3.246 3.377,-5.271 0.812,-2.028 1.222,-4.235 1.222,-6.626 0,-2.317 -0.41,-4.482 -1.222,-6.491 C 262.66,1.217 262.347,0.6 262.014,0 h -5.527 c 0.564,0.958 0.854,2.15 0.854,3.588 0,2.043 -0.571,3.543 -1.716,4.491 -1.142,0.953 -2.559,1.517 -4.259,1.691 l 6.495,10.024 h -3.795 l -6.178,-9.765 h -3.74 v 9.765 h -3.529 V 0 h -6.338 c -0.332,0.6 -0.645,1.217 -0.91,1.875 -0.812,2.008 -1.221,4.173 -1.221,6.491 0,2.392 0.408,4.599 1.221,6.626 0.812,2.024 1.939,3.783 3.375,5.27 z M 99.877,38.848 c -4.923,0 -7.531,3.845 -7.586,7.781 h 15.825 c 0,-4.64 -2.936,-7.781 -8.239,-7.781 z M 265.756,0 c 0.119,0.245 0.251,0.479 0.362,0.731 1.037,2.356 1.559,4.901 1.559,7.634 0,2.811 -0.521,5.396 -1.559,7.771 -1.037,2.365 -2.438,4.427 -4.207,6.175 -1.767,1.749 -3.828,3.111 -6.18,4.079 -2.354,0.969 -4.865,1.455 -7.536,1.455 -2.665,0 -5.185,-0.485 -7.553,-1.455 -2.372,-0.967 -4.45,-2.33 -6.235,-4.079 -1.783,-1.749 -3.193,-3.811 -4.23,-6.175 -1.039,-2.375 -1.561,-4.96 -1.561,-7.771 0,-2.733 0.521,-5.278 1.561,-7.634 C 230.288,0.479 230.421,0.245 230.54,0 H 0 l 27.257,116.188 c 57.227,-36.803 112.227,-1.435 114.439,-0.086 h 0.006 c 0.005,-0.004 0.011,-0.007 0.017,-0.01 h 0.028 c 0.004,0.003 0.012,0.006 0.016,0.01 h 0.009 c 2.208,-1.349 57.211,-36.717 114.437,0.086 L 283.464,0 Z M 74.901,70.539 H 37.644 V 31.733 h 16.75 V 59.98 h 20.507 z m 50.111,-16.1 H 92.32 c 0,5.051 4.276,8.861 9.975,8.861 3.389,0 6.476,-1.121 8.657,-4.154 h 13.037 c -4.261,9.791 -12.526,12.575 -23.794,12.575 -14.654,0 -25.015,-7.935 -25.015,-20.504 0,-13.424 10.206,-20.506 25.015,-20.506 16.568,0 24.875,10.736 24.875,21.07 -10e-4,0.862 0.066,1.723 -0.058,2.658 z m 30.326,16.162 h -14.116 l -21.076,-38.9 h 19.02 l 12.094,23.646 0.333,0.713 0.303,-0.713 11.311,-23.647 h 11.421 z m 37.224,-0.076 H 176.406 V 31.628 h 16.156 z m 12.137,-34.022 -4.867,5.294 h -2.024 l 2.231,-5.772 h -4.459 v -7.697 h 9.119 z m 21.203,35.13 c -17.264,0 -20.406,-9.974 -20.406,-12.445 h 12.501 c 0,1.452 1.967,3.193 3.627,3.901 1.366,0.585 2.888,0.7 4.312,0.7 3.52,0 6.408,-0.854 6.408,-2.898 0,-2.489 -2.957,-3.041 -6.219,-3.509 -8.877,-1.28 -21.318,-2.771 -21.318,-12.701 0,-9.262 10.113,-13.976 20.849,-13.976 17.187,0 21.743,9.521 21.743,12.278 h -12.705 c 0,-0.823 -0.627,-2.403 -2.359,-3.307 -1.285,-0.671 -3.174,-1.214 -5,-1.214 -4.747,0 -7.418,0.988 -7.418,3.163 0,1.777 2.408,2.658 5.865,3.251 9.023,1.549 22.879,2.085 22.879,13.066 -0.001,5.578 -4.831,13.691 -22.759,13.691 z"
        id="path2-7"
      />
    </g>
  </svg>
);

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: dressSVG },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithIcon = [
  { id: "zara", label: "Zara", icon: zara },
  { id: "adidas", label: "Adidas", icon: adidias },
  { id: "levi", label: "Levi's", icon: levis },
  { id: "nike", label: "Nike", icon: nike },
  { id: "h&m", label: "H&M", icon: HnM },
  { id: "puma", label: "Puma", icon: puma },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { featureImageList } = useSelector((state) => state.commonFeature);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Something For Everyone
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 rounded-full">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow h-full rounded-full"
              >
                <CardContent
                  className="flex flex-col items-center justify-center p-6 h-full w-full rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(109.6deg, rgba(112,246,255,0.33) 11.2%, rgba(221,108,241,0.26) 42%, rgba(229,106,253,0.71) 71.5%, rgba(123,183,253,1) 100.2%)",
                  }}
                >
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Trusted Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  {/* <span className="font-bold">{brandItem.label}</span> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Quality You Can Trust, Style You’ll Love!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList
                  .slice(0, 8)
                  .map((productItem) => (
                    <ShoppingProductTile
                      key={productItem.id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
