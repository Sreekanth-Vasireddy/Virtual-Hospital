import React, { Fragment, useState } from "react";
import { GetDoc } from "../../db/hooks/authHooks";
import { updateDocPic } from "../../db/ops/authOps";

function Profile({ uid }) {
  const { doctor, dataPresent } = GetDoc(uid);
  const [uploading, setUploading] = useState(false);

  const handlePicChange = async (e) => {
    setUploading(true);
    await updateDocPic(e.target.files[0], uid);
  };

  return (
    <Fragment>
      <div className="mw-full">
        <div className="card p-0 text-center">
          <img
            src={
              dataPresent && doctor.profileImage.length > 0
                ? doctor.profileImage
                : "https://www.pngfind.com/pngs/b/610-6104451_placeholder-png.png"
            }
            className="img-fluid rounded-circle mt-10"
            alt="..."
            width="200"
            height="200"
          />

          <div className="content">
            <h2 className="content-title">{`Dr. ${doctor.fullName}`}</h2>
            <p className="text-muted">{`Email: ${doctor.email}`}</p>
            {dataPresent && !doctor.profileImage.length > 0 && (
              <div className="custom-file">
                <label htmlFor="profile-pic">Update Picture</label>
                <input
                  type="file"
                  id="profile-pic"
                  accept=".jpg,.png,.jpeg"
                  onChange={handlePicChange}
                  disabled={uploading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
