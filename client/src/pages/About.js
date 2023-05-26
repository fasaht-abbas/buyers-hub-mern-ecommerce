import React from "react";
import Wrapper from "../components/Layout/Wrapper";
import BHBG from "../images/BHBG.png";
const About = () => {
  return (
    <Wrapper title="About-Buyers  Hub">
      <>
        <div class="container text-norm">
          <p className="text-center display-5 m-5">About Buyers Hub</p>
          <div class="row">
            <div class="col-md-6 mb-2">
              <img src={BHBG} class="img-fluid" alt="Your Photo" />
            </div>
            <div class="col-md-6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                eget est sed purus tincidunt consectetur non id sem. Proin a
                nunc sit amet elit tempor feugiat nec ut ante. Nunc eu nisl nec
                mauris tempor tincidunt ac at ligula. Nullam eleifend tortor
                vitae rutrum suscipit. Ut fringilla, sapien eu semper egestas,
                risus risus commodo metus, vitae efficitur est velit in tellus.
                Mauris tincidunt diam vitae tortor dapibus semper. Sed a
                interdum turpis. Nulla facilisi. Proin euismod massa vel risus
                varius bibendum. Vestibulum accumsan condimentum massa a
                ullamcorper. Nulla facilisi.
              </p>
              <p>
                Aliquam eget mauris nec ex tristique scelerisque non ac nisi.
                Proin congue mauris vitae diam commodo, nec finibus odio
                lobortis. Nulla pharetra pharetra arcu. Mauris malesuada, sapien
                et cursus consequat, purus nibh fringilla leo, vitae scelerisque
                dolor tortor at ex. Aliquam vitae ex vitae turpis mollis
                tristique ac eu elit. Donec feugiat ultrices diam, non efficitur
                mi. Donec id odio magna. Donec tempus volutpat leo, non
                efficitur risus facilisis ut. Nullam lacinia venenatis interdum.
                Nulla facilisi. Morbi nec mauris vitae mi interdum dictum. Donec
                at viverra lacus.
              </p>
            </div>
          </div>
        </div>
      </>
    </Wrapper>
  );
};

export default About;
