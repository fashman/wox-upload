# wox-upload

## 使用

> 配合 ant-form getFieldDecorator 使用，initialValue值为 String(单图) 或 Array(多图)类型；

```javascript
import WoxUpload from 'wox-upload';

<FormItem>
  {getFieldDecorator('logoUrl', {
    rules: [{
      required: true, message: 'Please upload your logo'
    }],
    initialValue: curData.logoUrl || '',
  })(
    <WoxUpload 
      Max={1} 
      imgType={['png']} 
      imgSize={1024} 
      action={`${Base.img}/wximg/dppLogo/upload`}
    />
    // 单图一般 <WoxUpload action={`${Base.img}/wximg/dppLogo/upload`}/> 即可
  )}
</FormItem>
```

## 参数

> **imgType** 图片类型：Array,默认包含 jpg png jpeg gif；

> **imgSize** 图片大小：Number 单位为KB,默认 1024KB；

> **action**  图片上传URL：String；

> **Max**  图片上传最大数：Number,默认 1；>1 为多图模式，默认为单图模式