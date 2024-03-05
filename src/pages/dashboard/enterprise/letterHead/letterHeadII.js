import Image from "next/image";
import React from "react";

const LetterHeadII = () => {
  return (
    <div className="m-auto max-w-[1024px] p-8">
      <div className="m-auto w-[600px] h-[864px] shadow-lg p-6 flex flex-col">
        <div className="flex justify-end">
          <div className="bg-BlueHomz rounded-tl-lg rounded-bl-lg h-[36px] w-[420px] flex items-center px-8">
            <p className="text-[16px] font-[800] text-white">COMPANY NAME</p>
          </div>
        </div>
        <div className="bg-inputBg h-[36px] w-full flex items-center justify-center rounded-md mt-9">
          <p className="text-[16px] font-[800] text-GrayHomz">
            Tenancy Agreement
          </p>
        </div>
        <p className="text-[10px] font-[400] text-BlackHomz mt-3 text-justify breakpoint">
          Lorem ipsum dolor sit amet consectetur. Viverra tortor pharetra metus
          at velit. Integer commodo facilisi ut proin volutpat porttitor fames.
          Eros quam lobortis gravida pretium sed pellentesque est cras.
          Vulputate diam at amet aenean augue ipsum et amet. Quisque massa id
          porttitor accumsan. <br /> <br /> Integer lorem cursus sit eget.
          Maecenas tempor egestas ut commodo. Malesuada risus suspendisse nec
          egestas augue. Ut mauris integer tincidunt eu elementum at consequat
          eget. Aliquam faucibus tortor egestas habitant aliquam est. Mus
          feugiat massa tincidunt mauris nunc sed pellentesque amet at.
          Consequat in id scelerisque etiam velit felis nullam morbi. Non
          pretium nulla non parturient.
          <br /> <br />
          Semper amet purus dolor nibh porttitor etiam. Lacinia felis morbi
          massa egestas sed ridiculus. Tincidunt enim rhoncus odio risus
          volutpat nisl amet elit diam. Vel nunc eros bibendum tristique egestas
          leo. Lacus tincidunt nibh at sed a adipiscing in. Lectus vivamus arcu
          molestie amet sit nulla.
          <br /> <br />
          Faucibus sed id morbi posuere tristique interdum. Velit sodales non
          sed sed. Mauris viverra elementum mattis pharetra nec turpis luctus.
          Facilisis pretium sed duis nulla amet. Velit purus augue feugiat et
          nullam dictum faucibus nulla. Gravida id enim lobortis pretium netus.
          Eu etiam vitae pretium eros faucibus parturient et sed et. Aliquam eu
          arcu lacinia neque. Sit consectetur nisi consequat at ut scelerisque
          at. Aliquam aenean orci porttitor tincidunt. Mi mus nisi enim
          consequat etiam pellentesque. <br />
          <br />
          Vitae mi venenatis ornare amet commodo ipsum nunc egestas. Sapien
          nullam id ultrices ut. Placerat sed nisl urna suspendisse viverra
          porta.
          <br /> <br />
          Semper amet purus dolor nibh porttitor etiam. Lacinia felis morbi
          massa egestas sed ridiculus. Tincidunt enim rhoncus odio risus
          volutpat nisl amet elit diam. Vel nunc eros bibendum tristique egestas
          leo. Lacus tincidunt nibh at sed a adipiscing in. Lectus vivamus arcu
          molestie amet sit nulla. <br /> <br /> Faucibus sed id morbi posuere
          tristique interdum. Velit sodales non sed sed. Mauris viverra
          elementum mattis pharetra nec turpis luctus. Facilisis pretium sed
          duis nulla amet. Velit purus augue feugiat et nullam dictum faucibus
          nulla. Gravida id enim lobortis pretium netus. Eu etiam vitae pretium
          eros faucibus parturient et sed et. Aliquam eu arcu lacinia neque. Sit
          consectetur nisi consequat at ut scelerisque at. Aliquam aenean orci
          porttitor tincidunt. Mi mus nisi enim consequat etiam pellentesque.{" "}
          <br /> <br /> Vitae mi venenatis ornare amet commodo ipsum nunc
          egestas. Sapien nullam id ultrices ut. Placerat sed nisl urna
          suspendisse viverra porta. <br /> <br />
          Faucibus sed id morbi posuere tristique interdum. Velit sodales non
          sed sed. Mauris viverra elementum mattis pharetra nec turpis luctus.
          Facilisis pretium sed duis nulla amet. Velit purus augue feugiat et
          nullam dictum faucibus nulla. Gravida id enim lobortis pretium netus.
          Eu etiam vitae pretium eros faucibus parturient et sed et. Aliquam eu
          arcu lacinia neque. Sit consectetur nisi consequat at ut scelerisque
          at. Aliquam aenean orci porttitor tincidunt. Mi mus nisi enim
          consequat etiam pellentesque.
          <br /> <br />
          Vitae mi venenatis ornare amet commodo ipsum nunc egestas. Sapien
          nullam id ultrices ut. Placerat sed nisl urna suspendisse viverra
          porta.
        </p>
        <div className="bg-BlueHomz rounded-md h-[36px] w-full flex items-center justify-between px-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 flex items-center justify-center rounded-full bg-white">
              <Image
                src={"/static/dashboard/enterprisemanager/letterHead/sms.png"}
                alt=""
                height={10}
                width={10}
              />
            </div>
            <p className="text-[8px] font-[500] text-white pt-1">
              Estate manager’s email@gmail.com
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 flex items-center justify-center rounded-full bg-white">
              <Image
                src={"/static/dashboard/enterprisemanager/letterHead/call.png"}
                alt=""
                height={10}
                width={10}
              />
            </div>
            <p className="text-[8px] font-[500] text-white pt-1">
              0000 000 0000
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 flex items-center justify-center rounded-full bg-white">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/letterHead/location.png"
                }
                alt=""
                height={10}
                width={10}
              />
            </div>
            <p className="text-[8px] font-[500] text-white pt-1">
              17, Alapere, Alagomeji Area, Yaba, Lagos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterHeadII;
