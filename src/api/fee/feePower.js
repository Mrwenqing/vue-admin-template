import request from "@/utils/request";
export function getList(params) {
  console.log(params);
  return request({
    url: "/feePower/list",
    method: "get",
    params,
  });
}
export function getFormList() {
    return request({
      url: "/HouseBuilding/unitList",
      method: "get",
    });
  }
  export function getFormBuildId(params) {
    return request({
      url: "/houseUnit/getUnitListByBuildId",
      method: "get",
      params,
    });
  }
  export function getFormUnitId(params) {
    return request({
      url: "/houseList/getHouseByUnitId",
      method: "get",
      params,
    });
  }
  export function getNewAdd(data) {
    return request({
      url: "/feePower",
      method: "post",
      data,
    });
  }
  export function getEdit(data) {
    return request({
      url: "/feePower",
      method: "put",
      data,
    });
  }
  export function getDelte(id) {
    return request({
      url: `/feePower/${id}`,
      method: "DELETE",
    });
  }
  export function getPay(data) {
    return request({
      url: `/feePower/payPower`,
      method: "post",
      data
    });
  }
