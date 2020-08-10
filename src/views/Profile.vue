<template>
    <div id="container">
        <div class="sidebar">
            <div class="profile-img">
                <img
                        src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                        class="profile"
                        alt=""/>
                <button class="updateIcon">
                    <FontAwesomeIcon icon="camera"/>
                </button>
            </div>


            <div class="userPersonal">

                <h3>User Name</h3>
                <h5>Software Engineer</h5>
                <br/>
            </div>
            <div class="tab">
                <button
                        class="tabItems"
                        @click="currentTab='about'"
                        :class="currentTab==='about'?'active':''"
                >About
                </button>
                <button
                        class="tabItems"
                        @click="currentTab='profile'"
                        :class="currentTab==='profile'?'active':''"
                >Edit Profile
                </button>
                <button
                        class="tabItems"
                        @click="currentTab='updatePass'"
                        :class="currentTab==='updatePass'?'active':''"
                >Update Password
                </button>
            </div>
        </div>
        <div class="profileContent">
            <div class="visualItems" v-if="currentTab === 'about'">
                <h3>About Hasib Arman</h3>
                <hr/>
                <div class="row-item">
                    <span>Name:</span>
                    <span>Hasib Arman</span>
                </div>
                <div class="row-item">
                    <span>email:</span>
                    <span>Hasib.Arman@gmail.com</span>
                </div>
                <div class="row-item">
                    <span>phone:</span>
                    <span>+880 02145487</span>
                </div>
                <div class="row-item">
                    <span>address:</span>
                    <span>khulna bangladesj</span>
                </div>
                <div class="row-item">
                    <span>Profession :</span>
                    <span>software developer</span>
                </div>
                <div class="row-item">
                    <span>Bio :</span>
                    <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem consequuntur delectus
            doloremque ea enim expedita fugiat libero minima mollitia nemo nobis obcaecati possimus quaerat
            quam quasi quo repellendus tempore voluptate, voluptatem. Ad aperiam at autem corporis dolor earum,
            illum magni minima neque nisi non porro provident quibusdam repellat repellendus rerum temporibus?
            Accusamus minus nisi nostrum voluptates. Ab, aspernatur, corporis culpa ducimus fuga fugit itaque
            iure laborum minima nulla quibusdam sed veritatis voluptas? Delectus dolor, eaque mollitia nemo
            quae quas rem vitae! Adipisci alias architecto asperiores culpa dolores enim error explicabo ipsa
            maxime neque numquam, porro quae rem sequi, voluptatem!
          </span>
                </div>
            </div>

            <div class="visualItems" v-if="currentTab === 'profile'">
                <h3>Edit Your Profile</h3>
                <hr/>
                <div class="innerProfile">
                    <form>
                        <div class="row">
                            <div class="col">
                <span>
                  <label>First Name</label>
                  <br/>
                  <TextInput
                          v-model="user.firstName"
                          class="inputItems"
                          placeholder="First Name"
                          type="text"
                  />
                </span>
                            </div>
                            <div class="col">
                <span>
                  <label>Last Name</label>
                  <br/>
                  <TextInput
                          v-model="user.lastName"
                          class="inputItems"
                          placeholder="Last Name"
                          type="text"
                  />
                </span>
                            </div>
                            <div class="col">
                <span>
                  <label>Email</label>
                  <br/>
                  <TextInput
                          v-model="user.email"
                          class="inputItems"
                          placeholder="Email"
                          type="email"
                  />
                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                <span>
                  <label>Phone</label>
                  <br/>
                  <TextInput
                          v-model="user.phone"
                          class="inputItems"
                          placeholder="Phone"
                          type="text"
                  />
                </span>
                            </div>
                            <div class="col">
                <span>
                  <label>Profession</label>
                  <br/>
                  <TextInput
                          v-model="user.profession"
                          class="inputItems"
                          placeholder="Profession"
                          type="text"
                  />
                </span>
                            </div>
                            <div class="col">
                <span>
                  <label>Address</label>
                  <br/>
                  <TextInput
                          v-model="user.address"
                          class="inputItems"
                          placeholder="Address"
                          type="text"
                  />
                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="w-100">
                                    <label>Bio</label>
                                    <br/>
                                    <label>
                                        <textarea class="inputItems" v-model="user.bio" rows="4"></textarea>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <BlockButton class="btn">Update</BlockButton>
                        </div>
                    </form>
                </div>
            </div>

            <div class="visualItems" v-if="currentTab === 'updatePass'">
                <h3>Upate Password</h3>
                <hr/>

                <div class="profile-edit-box">
                    <form id="form" @submit.prevent="updatePassword">
                        <p class="title">Update Password</p>
                        <TextInput
                                v-model="oldPassword"
                                placeholder="old password"
                                type="password"
                                class="input"
                        />
                        <TextInput
                                v-model="newPassword"
                                class="input"
                                placeholder="new password"
                                type="password"
                        />
                        <BlockButton class="btn">Submit</BlockButton>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {updateUserPassword} from "@/lib/cloudClient.js";
    import BlockButton from "@/components/BlockButton";
    import TextInput from "@/components/TextInput";
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

    export default {
        components: {
            BlockButton,
            TextInput,
            FontAwesomeIcon
        },
        data() {
            return {
                currentTab: "about",
                oldPassword: null,
                newPassword: null,
                firstName: "",
                lastName: "",
                email: "",
                profileImageURL: "",
                user: "",
            };
        },
        methods: {
            async updatePassword() {
                try {
                    await updateUserPassword(
                        this.email,
                        this.oldPassword,
                        this.newPassword
                    );
                    this.$notify({
                        type: "success",
                        text: "Password changed successfully",
                    });
                    this.oldPassword = null;
                    this.newPassword = null;
                } catch (err) {
                    this.$notify({
                        type: "error",
                        text: err,
                    });
                }
            },
        },
    };
</script>

<style scoped lang="scss">
    @import "@/styles/colors.scss";


    .panel {
        background: white !important;
    }

    .w-100 {
        width: 100%;
    }

    .text-center {
        text-align: center;
    }

    #container {
        color: $gray-darker;
        display: flex;
        flex-wrap: wrap;
        background: -webkit-linear-gradient(left, #09082a, #16124f);
        height: 100%;

        .sidebar {
            width: 300px;
            text-align: center;
            height: 100%;

            @media (max-width: 768px) {
                width: 100%;
            }

            .profile-img {
                position: relative;

                img {
                    border-radius: 50%;
                    width: 171px;
                    margin-top: 25px;
                    border: 5px solid $white;
                }

                .updateIcon {
                    position: absolute;
                    left: calc(50% + 50px);
                    bottom: 8%;
                    height: 30px;
                    width: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 0;
                    box-shadow: 0 0 9px 1px #666666;

                    &:focus {
                        outline: 0;
                    }
                }
            }


            .userPersonal {
                margin-top: 10px;
                color: $white;
                position: relative;

                h3 {
                    margin: 0;
                }

                h5 {
                    margin: 0;
                }

                a {
                    background: #2468ff;
                    padding: 5px 21px;
                    border-radius: 16px;
                    text-decoration: none;
                    font-size: 13px;
                    color: #fff;

                    &:hover {
                        background: #3574ff;
                    }
                }
            }
        }

        .profileContent {
            flex: 1;

            .visualItems {
                background: $gray-lightest;
                padding: 15px;
                height: 95.3% !important;

                h3 {
                    color: #4a4fa7;
                }

                hr {
                    border-color: #e2e2e230;
                }

                .row-item {
                    color: grey;
                    text-transform: capitalize;
                    background: $white;
                    padding: 13px;
                    margin-bottom: 10px;
                    display: flex;
                    flex-wrap: wrap;

                    span {
                        font-weight: 500;
                        color: #2d306a;
                        text-transform: unset;
                        font-size: 14px;

                        &:first-child {
                            flex: 1;
                        }

                        &:last-child {
                            flex: 5;
                        }
                    }
                }

                .inputItems {
                    line-height: 26px;
                    width: 100%;
                    border: 1px solid #dcddef;
                    border-radius: 4px;
                    padding: 5px;

                    &:focus {
                        border: 1px solid #6e46b3;
                        background: #c2c2c245;
                        outline: none;
                    }
                }

                .profile-edit-box {
                    position: relative;
                    width: 70%;
                    margin: 0 auto;
                    box-shadow: 0 3px 9px 2px #0000001c;
                    @media (max-width: 768px) {
                        width: 99%;
                    }

                    form {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        padding: 30px;
                        align-items: center;
                        background: $white;
                        margin: 35px 0;

                        .title {
                            text-align: center;
                            font-size: 1.4rem;
                            padding: 12px 27px;
                            font-weight: bold;
                            color: #5e62b5;
                        }

                        .input {
                            margin: 10px;
                            width: 250px;
                            border: 1px solid #c2c2c2;
                            line-height: 26px;
                            padding: 6px;
                            border-radius: 4px;
                            font-size: 15px;

                            @media (max-width: 768px) {
                                width: 80%;
                            }

                            &:focus {
                                border: 1px solid #6e46b3;
                                background: #c2c2c245;
                            }
                        }
                    }
                }

                .btn {
                    width: 200px;
                    border-radius: 50px;
                    padding: 10px;
                    font-size: 1rem;
                    margin: 10px;
                }
            }
        }
    }

    .innerProfile {
        width: 80%;
        margin: 33px auto;
        padding: 25px;
        background: $white;
        box-shadow: 0 3px 9px 2px #0000001c;

        .row {
            display: flex;
            flex-wrap: wrap;
            @media (max-width: 768px) {
                flex-direction: column;
            }

            .col {
                flex: 1;
                padding: 15px;
            }
        }
    }

    .profileContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 83.9vh;
    }

    .tab {
        width: 100%;
        margin: 50px 0;
        display: flex;
        flex-direction: column;

        .tabItems {
            padding: 8px 2px;
            text-decoration: none;
            font-size: 13px;
            margin: 6px 0 0 66px;
            cursor: pointer;
            color: #2d306a;
            font-weight: bold;
            border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;
            background: #86a0ec;
            border: 0;

            &.active {
                background: $gray-lightest;
                color: #2d306a;
            }

            &:hover {
                background: $gray-lightest;
                color: #86a0ec;
            }

            &:focus {
                outline: none;
            }
        }
    }
</style>
