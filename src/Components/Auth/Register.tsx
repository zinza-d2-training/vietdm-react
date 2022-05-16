import {useForm, Controller} from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Register() {
    const {control, register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data: unknown) => {
        console.log(data)
    };

    return (
        <div className="register-form center-form">
            <div className="form-area">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="form-header">Đăng ký tài khoản</h3>
                    <div className="form-group required">
                        <label htmlFor="cccd_number">Số CMND/CCCD</label>
                        <p className="error">{errors.cccd_number?.message}</p>
                        <input
                            type="text"
                            className="form-control"
                            id="cccd_number"
                            placeholder="Số CMND/CCCD"
                            autoComplete="off"
                            {...register("cccd_number", {
                                required: "Số CMND/CCCD phải được nhập",
                                pattern: {
                                    value: /^(\d{9}|\d{12})$/i,
                                    message: 'Số CMND/CCCD phải có 9 hoặc 12 chữ số'
                                }
                            })}
                        />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="email">Email</label>
                        <p className="error">{errors.email?.message}</p>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            autoComplete="off"
                            {...register('email', {
                                required: "Địa chỉ email là bắt buộc",
                                pattern: {
                                    value: /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/i,
                                    message: 'Địa chỉ email không đúng định dạng'
                                }
                            })}
                        />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="password">Mật khẩu</label>
                        <p className="error">{errors.password?.message}</p>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="*******"
                            {...register('password', {
                                required: "Mật khẩu không được trống",
                                minLength: {
                                    value: 6,
                                    message: 'Mật khẩu phải chứa ít nhất 6 ký tự'
                                }
                            })}
                        />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="fullname">Họ và tên</label>
                        <p className="error">{errors.fullname?.message}</p>
                        <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            autoComplete="off"
                            placeholder="Họ và tên"
                            {...register('fullname', {
                                required: "Hãy nhập Họ và tên của bạn"
                            })}
                        />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="birthday">Ngày sinh</label>
                        <p className="error">{errors.birthday?.message}</p>
                        <Controller
                            control={control}
                            name='birthday'
                            rules={{required: "Bạn chưa có ngày sinh =))"}}
                            render={({field}) => (
                                <DatePicker
                                    dropdownMode="select"
                                    className="form-control"
                                    id="birthday"
                                    placeholderText="Ngày sinh"
                                    dateFormat="dd/MM/Y"
                                    selected={field.value}
                                    autoComplete="off"
                                    showMonthDropdown
                                    showYearDropdown
                                    adjustDateOnChange
                                    onChange={field.onChange}
                                    onKeyDown={(e: Event) => {
                                        e.preventDefault();
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="gender">Giới tính</label>
                        <p className="error">{errors.gender?.message}</p>
                        <select className="form-control" id="gender" {...register('gender', {
                            required: "Giới tính bắt buộc phải chọn"
                        })}>
                            <option value="">Giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-submit-custom mt-4">
                        <span>Tiếp tục</span>
                        <ArrowForwardIcon/>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;