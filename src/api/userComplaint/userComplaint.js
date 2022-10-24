import request from "@/utils/request";
export function getList(params) {
  console.log(params);
  return request({
    url: "/userComplaint/list",
    method: "get",
    params,
  });
}