import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const ShopModalContent = ({ shopList }) => {
    // 상점에서 아이템 선택 시 내 정보의 프로필 이미지 및 게임 테마를 수정
    const handleImageClick = (item) => {
        if (item.p_type === "theme") {
            axios
                .patch(
                    `${process.env.REACT_APP_API_SERVER}/auth/mypage/changeCustom`,
                    { theme: item.p_name }
                )
                .then((response) => {
                    // 요청 성공 시 처리할 내용
                    // 기능 동작은 하나 후처리 안됨.(새로고침 시 적용)
                })
                .catch((error) => {
                    // 요청 실패 시 처리할 내용
                    console.error("Axios request error:", error);
                });
        } else if (item.p_type === "profile") {
            axios
                .patch(
                    `${process.env.REACT_APP_API_SERVER}/auth/mypage/changeCustom`,
                    { profile: item.p_img }
                )
                .then((response) => {
                    // 요청 성공 시 처리할 내용
                    // 기능 동작은 하나 후처리 안됨.(새로고침 시 적용)
                })
                .catch((error) => {
                    // 요청 실패 시 처리할 내용
                    console.error("Axios request error:", error);
                });
        } else if (item.p_type === "profileEdge") {
            axios
                .patch(
                    `${process.env.REACT_APP_API_SERVER}/auth/mypage/changeCustom`,
                    { profileEdge: item.p_img }
                )
                .then((response) => {
                    // 요청 성공 시 처리할 내용
                    // 기능 동작은 하나 후처리 안됨.(새로고침 시 적용)
                })
                .catch((error) => {
                    // 요청 실패 시 처리할 내용
                    console.error("Axios request error:", error);
                });
        }
    };

    const groupItemsByType = () => {
        const groupedItems = {};
        if (shopList) {
            shopList.forEach((item) => {
                const { p_type } = item;
                if (!groupedItems[p_type]) {
                    groupedItems[p_type] = [];
                }
                groupedItems[p_type].push(item);
            });
        }
        return groupedItems;
    };

    const groupedItems = groupItemsByType();

    return (
        <div className="shop-modal">
            <div className="shop-modal-header">
                <h2 className="shop-modal-title">악세사리</h2>
            </div>

            <div className="shop-items">
                {Object.keys(groupedItems).map((type) => (
                    <div key={type}>
                        <span
                            className="type-label"
                            style={{ fontWeight: "bold" }}
                        >
                            {type}
                        </span>
                        <br />
                        {groupedItems[type].map((item, index) => (
                            <div className={`shop-item`} key={item.product_id}>
                                <div className="shop-item-color">
                                    <img
                                        src={item.p_img}
                                        alt={item.p_img}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            cursor: "pointer",
                                        }} // 커서를 포인터로 변경하여 클릭 가능하게 함
                                        onClick={() => handleImageClick(item)}
                                    />
                                </div>
                                <div className="shop-item-title">
                                    {item.p_name}
                                </div>
                                <div className="shop-item-price">
                                    {item.p_price}P
                                </div>
                            </div>
                        ))}
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopModalContent;
